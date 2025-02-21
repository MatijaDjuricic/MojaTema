package config

import (
	"net/http"

	"github.com/MatijaDjuricic/MojaTema/socket/internal/chat"
	"github.com/MatijaDjuricic/MojaTema/socket/internal/message"
)

func InitializeRoutes(router *http.ServeMux) {
	router.HandleFunc("/ws", chat.HandleWebSocket)
	router.HandleFunc("GET /api/messages", message.HandleGetMessages)
	router.HandleFunc("GET /api/messages/chat", message.HandleGetMessagesFromChat)
	router.HandleFunc("GET /api/messages/{id}", message.HandleGetMessageById)
	router.HandleFunc("DELETE /api/messages/{id}", message.HandleDeleteMessageById)
}
