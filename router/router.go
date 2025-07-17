package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jcasanella/golang_chat/internal/room"
	"github.com/jcasanella/golang_chat/internal/user"
	"github.com/jcasanella/golang_chat/internal/ws"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler, wsHandler *ws.Handler, roomHandler *room.Handler) {
	r = gin.Default()

	r.Static("/static", "./static")
	r.LoadHTMLGlob("templates/*")

	// Middleware to set the Content-Type header for HTML responses
	r.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "Chat"})
	})

	r.GET("/signup", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "signup.tmpl", gin.H{
			"title": "Chat"})
	})

	r.GET("/room", func(ctx *gin.Context) {
		_, err := ctx.Cookie("jwt")
		if err != nil {
			ctx.Redirect(http.StatusFound, "/")
			return
		}
		ctx.HTML(http.StatusOK, "room.tmpl", gin.H{
			"title": "Chat"})
	})

	r.GET("/logout", func(ctx *gin.Context) {
		ctx.SetCookie("jwt", "", -1, "", "", false, true)
		ctx.Redirect(http.StatusFound, "/")
	})

	// API User routes
	r.POST("/api/signup", userHandler.CreateUser)
	r.POST("/api/login", userHandler.Login)
	r.POST("/api/logout", userHandler.Logout)

	// API Room routes
	r.GET("/api/room", roomHandler.GetRooms)

	// WebSocket routes
	r.POST("/ws/createRoom", wsHandler.CreateRoom)
	r.GET("/ws/joinRoom/:roomID", wsHandler.JoinRoom)
	r.GET("/ws/getRoom/:roomId", wsHandler.GetClients)
}

func Start(addr string) error {
	return r.Run(addr)
}
