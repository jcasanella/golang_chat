package user

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// MockService implements the Service interface for testing
type MockService struct {
	CreateUserFunc func(ctx context.Context, req *CreateUserReq) (*CreateUserRes, error)
	LoginFunc      func(ctx context.Context, req *LoginUserReq) (*LoginUserRes, error)
}

func (m *MockService) CreateUser(ctx context.Context, req *CreateUserReq) (*CreateUserRes, error) {
	return m.CreateUserFunc(ctx, req)
}
func (m *MockService) Login(ctx context.Context, req *LoginUserReq) (*LoginUserRes, error) {
	return m.LoginFunc(ctx, req)
}

func setupRouter(handler *Handler) *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.POST("/api/signup", handler.CreateUser)
	r.POST("/api/login", handler.Login)
	r.POST("/api/logout", handler.Logout)
	return r
}

func TestCreateUser_Success(t *testing.T) {
	mockService := &MockService{
		CreateUserFunc: func(ctx context.Context, req *CreateUserReq) (*CreateUserRes, error) {
			return &CreateUserRes{
				ID:          "1",
				Username:    "testuser",
				Email:       "test@example.com",
				accessToken: "token123",
			}, nil
		},
	}
	handler := NewHandler(mockService)
	router := setupRouter(handler)

	body := CreateUserReq{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "Password123!",
	}
	jsonBody, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "/api/signup", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
	assert.Contains(t, w.Body.String(), `"Username":"testuser"`)
	assert.Contains(t, w.Body.String(), `"Email":"test@example.com"`)
	cookie := w.Header().Get("Set-Cookie")
	assert.Contains(t, cookie, "jwt=token123")
}

func TestCreateUser_BadRequest(t *testing.T) {
	mockService := &MockService{}
	handler := NewHandler(mockService)
	router := setupRouter(handler)

	req, _ := http.NewRequest("POST", "/api/signup", bytes.NewBuffer([]byte(`invalid json`)))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}

func TestCreateUser_ServiceError(t *testing.T) {
	mockService := &MockService{
		CreateUserFunc: func(ctx context.Context, req *CreateUserReq) (*CreateUserRes, error) {
			return nil, errors.New("service error")
		},
	}
	handler := NewHandler(mockService)
	router := setupRouter(handler)

	body := CreateUserReq{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "Password123!",
	}
	jsonBody, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "/api/signup", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusInternalServerError, w.Code)
	assert.Contains(t, w.Body.String(), "service error")
}

func TestLogin_Success(t *testing.T) {
	mockService := &MockService{
		LoginFunc: func(ctx context.Context, req *LoginUserReq) (*LoginUserRes, error) {
			return &LoginUserRes{
				ID:          "1",
				Username:    "testuser",
				accessToken: "token456",
			}, nil
		},
	}
	handler := NewHandler(mockService)
	router := setupRouter(handler)

	body := LoginUserReq{
		Username: "testuser",
		Password: "Password123!",
	}
	jsonBody, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), `"Username":"testuser"`)
	cookie := w.Header().Get("Set-Cookie")
	assert.Contains(t, cookie, "jwt=token456")
}

func TestLogin_BadRequest(t *testing.T) {
	mockService := &MockService{}
	handler := NewHandler(mockService)
	router := setupRouter(handler)

	req, _ := http.NewRequest("POST", "/api/login", bytes.NewBuffer([]byte(`invalid json`)))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}

func TestLogin_ServiceError(t *testing.T) {
	mockService := &MockService{
		LoginFunc: func(ctx context.Context, req *LoginUserReq) (*LoginUserRes, error) {
			return nil, errors.New("login failed")
		},
	}
	handler := NewHandler(mockService)
	router := setupRouter(handler)

	body := LoginUserReq{
		Username: "testuser",
		Password: "Password123!",
	}
	jsonBody, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusInternalServerError, w.Code)
	assert.Contains(t, w.Body.String(), "login failed")
}

func TestLogout(t *testing.T) {
	mockService := &MockService{}
	handler := NewHandler(mockService)
	router := setupRouter(handler)

	req, _ := http.NewRequest("POST", "/api/logout", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "logout successful")
	cookie := w.Header().Get("Set-Cookie")
	assert.Contains(t, cookie, "jwt=;")
}
