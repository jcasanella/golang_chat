package db

import "database/sql"

type Database struct {
  db *sql.DB
}

func NewDatabase() (*Database, error) {
  // TODO: Replace with env variables encrypted
  db, err := sql.Open("postgres", "postgresql://root:password@localhost:5433/go-chat?sslmode=disable")
  if err != nil {
    return nil, err
  }

  return &Database{ db: db }, nil
}
