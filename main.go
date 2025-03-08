package main

import (
	"fmt"
	"io"
	"net/http"
  "github.com/gorilla/websocket"
)

type Server struct {
  conns map[*websocket.Conn]bool
}

func NewServer() *Server {
  return &Server {
    conns: make(map[*websocket.Conn]bool),
  }
}

var upgrader = websocket.Upgrader {
  CheckOrigin: func(r *http.Request) bool { return true }, // Allow all connections
}

func (s *Server) handleWS(w http.ResponseWriter, r *http.Request) {
  fmt.Println("new incoming connection from client:", r.RemoteAddr)

  ws, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    fmt.Println("Failing upgrader", err)
    return
  }

  defer ws.Close()

  // We should add some mutex
  s.conns[ws] = true

  s.readLoop(ws)
}

func (s *Server) broadcast(msg []byte) {
  for client := range s.conns {
    go func(*websocket.Conn) {
      if err := client.WriteMessage(websocket.TextMessage, msg); err != nil {
        fmt.Println("Broadcast error", err)
        client.Close()
        delete(s.conns, client)
      }
    }(client)
  }
}

func (s *Server) readLoop(ws *websocket.Conn) {
  for {
    _, msg, err := ws.ReadMessage()
    if err != nil {
      if err == io.EOF { // Means connection closed in the client
        fmt.Println("client disconnected")
        delete(s.conns, ws)
        break
      }
      fmt.Println("read error:", err)
      continue
    }

    fmt.Printf("Received: %s\n", msg)
    if err:= ws.WriteMessage(websocket.TextMessage, msg); err != nil {
      fmt.Println("write error:", err)
      delete(s.conns, ws)
      break
    }

    s.broadcast([]byte("Broadcast message"))
  }
}

func main()  {
  server := NewServer()
  http.HandleFunc("/ws", server.handleWS)
  fmt.Println("WebSocket server started on :8080")
  err := http.ListenAndServe(":3000", nil)
  if err != nil {
    fmt.Println("ListenAndServer:", err)
  }
}
