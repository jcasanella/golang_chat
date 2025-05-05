package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jcasanella/golang_chat/internal/user"
	"github.com/jcasanella/golang_chat/internal/ws"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler, wsHandler *ws.Handler) {
	r = gin.Default()

	r.Static("/static", "./static")
	r.LoadHTMLGlob("templates/*")

	r.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "Chat"})
	})

	r.GET("/signup", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "signup.tmpl", gin.H{
			"title": "Chat"})
	})

	r.POST("/signup", userHandler.CreateUser)
	r.POST("/login", userHandler.Login)
	r.GET("/logout", userHandler.Logout)

	r.POST("/ws/createRoom", wsHandler.CreateRoom)
	r.GET("/ws/joinRoom/:roomID", wsHandler.JoinRoom)
	r.GET("/ws/getRooms", wsHandler.GetRooms)
	r.GET("/ws/getRoom/:roomId", wsHandler.GetClients)
}

func Start(addr string) error {
	return r.Run(addr)
}
