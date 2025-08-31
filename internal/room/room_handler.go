package room

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jcasanella/golang_chat/internal/ws"
)

type Handler struct {
	hub *ws.Hub
}

func NewHandler(h *ws.Hub) *Handler {
	return &Handler{
		hub: h,
	}
}

type RoomRes struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

func (h *Handler) GetRooms(c *gin.Context) {
	rooms := make([]RoomRes, 0)

	for _, room := range h.hub.Rooms {
		rooms = append(rooms, RoomRes{
			Name:        room.Name,
			Description: room.Description,
			Icon:        room.Icon,
		})
	}

	c.JSON(http.StatusOK, rooms)
}

type CreateRoomReq struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

// CreateRoom handles the creation of a new chat room
func (h *Handler) CreateRoom(c *gin.Context) {
	var req CreateRoomReq

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	h.hub.Rooms[req.Name] = &ws.Room{
		Name:        req.Name,
		Description: req.Description,
		Icon:        req.Icon,
		Clients:     make(map[string]*ws.Client),
	}

	c.JSON(http.StatusOK, req)
}
