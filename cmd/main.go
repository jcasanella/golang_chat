package main

import (
	"log"

	"github.com/jcasanella/golang_chat/db"
	"github.com/jcasanella/golang_chat/internal/user"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("Could not initialize Database connection: %s", err)
	}

	userRep := user.NewRepository(dbConn.GetDB())
	userService := user.NewService(userRep)
	userHandler := user.NewHandler(userService)
}
