package user

import (
	"database/sql"

	"golang.org/x/net/context"
)

type DBTX interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

type repository struct {
	db DBTX
}

func NewRepository(db DBTX) Repository {
	return &repository{db: db}
}

func (r *repository) CreateUser(ctx context.Context, user *User) (*User, error) {
	// TODO: migrate to ORM
	var lastInsertId int
	query := "INSERT INTO users(username, password, email) VALUES ($1, $2, $3) returning id"
	err := r.db.QueryRowContext(ctx, query, user.Username, user.Password, user.Email).Scan(&lastInsertId)
	if err != nil {
		return &User{}, err
	}

	user.ID = int64(lastInsertId)
	return user, nil
}

func (r *repository) GetUserByUsername(ctx context.Context, userName string) (*User, error) {
	u := User{}

	query := "SELECT id, email, username, password FROM users WHERE username = $1"
	err := r.db.QueryRowContext(ctx, query, userName).Scan(&u.ID, &u.Email, &u.Username, &u.Password)
	if err != nil {
		return nil, err
	}

	return &u, nil
}
