package main

import (
	"log"

	"github.com/jcasanella/golang_chat/db"
	"github.com/jcasanella/golang_chat/internal/user"
	"github.com/jcasanella/golang_chat/internal/ws"
	"github.com/jcasanella/golang_chat/router"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("Could not initialize Database connection: %s", err)
	}

	userRep := user.NewRepository(dbConn.GetDB())
	userService := user.NewService(userRep)
	userHandler := user.NewHandler(userService)

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)

	router.InitRouter(userHandler, wsHandler)
	router.Start("0.0.0.0:8080")
}
