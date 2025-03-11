package user

import (
	"context"
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
  return &repository{ db: db }
}

func (r *repository) CreateUser(ctx context.Context, user *User) (*User, error) {

}
