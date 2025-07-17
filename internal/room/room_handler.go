package room

import (
	"fmt"
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
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func (h *Handler) GetRooms(c *gin.Context) {
	rooms := make([]RoomRes, 0)

	for _, room := range h.hub.Rooms {
		rooms = append(rooms, RoomRes{
			ID:          room.ID,
			Name:        room.Name,
			Description: "Dummy description for " + room.Name, // TODO: Replace with actual description
		})
	}

	// TODO: Remove this block when CreateRoom is implemented - only use to print something from UI temporally
	if len(rooms) == 0 {
		for i := 0; i < 10; i++ {
			rooms = append(rooms, RoomRes{
				ID:          "default",
				Name:        fmt.Sprintf("Default Room %d", i),
				Description: fmt.Sprintf("This is the default room %d", i),
			})
		}
	}

	c.JSON(http.StatusOK, rooms)
}