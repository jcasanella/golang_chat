package user

import (
	"fmt"
	"testing"

	"github.com/google/go-cmp/cmp"
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

func (r *RepositoryStub) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	if email != "" {
		return &User{
			Username: "testMock",
			Email:    "test@mock.com",
			Password: "test",
		}, nil
	} else {
		return nil, fmt.Errorf("User not present")
	}
}

func TestCreateUser(t *testing.T) {
	r := &RepositoryStub{}
	s := NewService(r)

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

}
