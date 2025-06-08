package config

import (
	"net/http"

	"github.com/MatijaDjuricic/MojaTema/socket/internal/chat"
	"github.com/MatijaDjuricic/MojaTema/socket/internal/message"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/db"
)

type RouteHandler struct {
	chat    *chat.ChatHandler
	message *message.MessageHandler
}

func NewRouteHandler() *RouteHandler {
	chat := chat.NewChatHandler(db.DbService)
	message := message.NewMessageHandler(db.DbService)
	return &RouteHandler{
		chat:    chat,
		message: message,
	}
}

func (h *RouteHandler) InitializeRoutes(router *http.ServeMux) {
	router.HandleFunc("/ws", h.chat.HandleWebSocket)
	router.HandleFunc("GET /api/messages", h.message.HandleGetMessages)
	router.HandleFunc("GET /api/messages/chat", h.message.HandleGetMessagesFromChat)
	router.HandleFunc("GET /api/messages/{id}", h.message.HandleGetMessageById)
	router.HandleFunc("DELETE /api/messages/{id}", h.message.HandleDeleteMessageById)
}
