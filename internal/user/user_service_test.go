package user

import (
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/jcasanella/golang_chat/util"
	"golang.org/x/net/context"
)

type RepositoryStub struct{}

func (r *RepositoryStub) CreateUser(ctx context.Context, user *User) (*User, error) {
	if user != nil {
		return &User{
			ID:       5678,
			Username: user.Username,
			Email:    user.Email,
			Password: user.Password,
		}, nil
	} else {
		return nil, fmt.Errorf("Invalid user")
	}
}

func (r *RepositoryStub) GetUserByUsername(ctx context.Context, userName string) (*User, error) {
	if hashedPassword, error := util.HashPassword("test"); error != nil {
		return nil, error
	} else {
		return &User{
			Username: userName,
			Password: hashedPassword,
			Email:    "test@email.com",
		}, nil
	}
}

var s Service

func TestMain(t *testing.M) {
	r := &RepositoryStub{}
	s = NewService(r)

	log.Print("Initialize Service")
	exitVal := t.Run()

	os.Exit(exitVal)
}

func TestCreateUser(t *testing.T) {

	t.Run("Should create a valid user", func(t *testing.T) {
		t.Parallel()

		actualUser, err := s.CreateUser(context.TODO(), &CreateUserReq{Username: "mock", Email: "mock@mock.com", Password: "test"})
		if err != nil {
			t.Error("User not created")
		}

		// Compare expected vs actual
		expectedUser := &CreateUserRes{
			ID:       "5678",
			Username: "mock",
			Email:    "mock@mock.com",
		}

		if diff := cmp.Diff(expectedUser, actualUser); diff != "" {
			t.Errorf("Mismatch (-expected +actual):\n%s", diff)
		}
	})

	var tests = []struct {
		name     string
		input    CreateUserReq
		errorMsg string
	}{
		{"An user without Username can not be created", CreateUserReq{Email: "mock@mock.com", Password: "test"}, "User creted without Username"},
		{"An user without Password can not be created", CreateUserReq{Username: "mock", Email: "mock@mock.com"}, "User created without Password"},
		{"An user without Email can not be created", CreateUserReq{Username: "mock", Password: "test"}, "User created without Email"},
	}
	for _, tt := range tests {

		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			if _, err := s.CreateUser(context.TODO(), &tt.input); err == nil {
				t.Error(tt.errorMsg)
			}
		})
	}
}

func TestLogin(t *testing.T) {
	loginUserReq := &LoginUserReq{Username: "testUser", Password: "test"}
	_, err := s.Login(context.TODO(), loginUserReq)
	if err != nil {
		t.Errorf("User %v not logger", loginUserReq)
	}
}
