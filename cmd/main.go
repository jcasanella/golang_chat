package main

import (
	"log"

	"github.com/jcasanella/golang_chat/db"
)

func main() {
  _, err := db.NewDatabase()
  if err != nil {
    log.Fatalf("Could not initialize Database connection: %s", err)
  }

}
