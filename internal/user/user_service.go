package user

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/jcasanella/golang_chat/util"

	"github.com/golang-jwt/jwt/v5"
)

type service struct {
	Repository
	timeout time.Duration
}

const secretKey = "secret"

func NewService(repository Repository) Service {
	return &service{repository, time.Duration(2) * time.Second}
}

func (s *service) CreateUser(c context.Context, req *CreateUserReq) (*CreateUserRes, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	if req.Password == "" {
		return nil, fmt.Errorf("User without password, can not be created")
	}

	if req.Username == "" {
		return nil, fmt.Errorf("User without username, can not be created")
	}

	if req.Email == "" {
		return nil, fmt.Errorf("User without email, can not be created")
	}

	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	u := &User{
		Username: req.Username,
		Email:    req.Email,
		Password: hashedPassword,
	}

	r, err := s.Repository.CreateUser(ctx, u)
	if err != nil {
		return nil, err
	}

	ss, err := generateToken(u.ID, u.Username)
	if err != nil {
		return nil, err
	}

	resp := &CreateUserRes{
		accessToken: ss,
		ID:          strconv.Itoa(int(r.ID)),
		Username:    r.Username,
		Email:       r.Email,
	}

	return resp, nil
}

type JWTClaims struct {
	ID       string `json:"string"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func generateToken(id int64, username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, JWTClaims{
		ID:       strconv.Itoa(int(id)),
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    strconv.Itoa(int(id)),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	})

	return token.SignedString([]byte(secretKey))
}

func (s *service) Login(c context.Context, req *LoginUserReq) (*LoginUserRes, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	u, err := s.Repository.GetUserByUserName(ctx, req.Username)
	if err != nil {
		return nil, err
	}

	err = util.CheckPassword(req.Password, u.Password)
	if err != nil {
		return nil, err
	}

	ss, err := generateToken(u.ID, u.Username)
	if err != nil {
		return nil, err
	}

	return &LoginUserRes{accessToken: ss, Username: u.Username, ID: strconv.Itoa(int(u.ID))}, nil
}
