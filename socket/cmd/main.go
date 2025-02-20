package main

import (
	"net/http"
	"os"

	"github.com/MatijaDjuricic/internal/chat"
	"github.com/MatijaDjuricic/internal/message"
	"github.com/MatijaDjuricic/pkg/db"
	"github.com/MatijaDjuricic/pkg/logger"
	"github.com/joho/godotenv"
)

func main() {
	log := logger.NewLogger(logger.INFO)
	if err := godotenv.Load(".env"); err != nil {
		log.Error("Error loading .env file", err)
	}
	mongoUri := os.Getenv("MONGO_URI_PRIVATE")
	port := os.Getenv("PORT")
	DBService, err := db.Connect(mongoUri)
	if err != nil {
		log.Error("Error connecting to database:", err)
	}
	chat.DBService, message.DBService = DBService, DBService
	defer db.Close(DBService)
	http.HandleFunc("/ws", chat.HandleWebSocket)
	http.HandleFunc("/api/messages", message.HandleGetMessages)
	http.HandleFunc("/api/messages/chat", message.HandleGetMessagesFromChat)
	log.Info("WebSocket server listening on %s...", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Error("Server run failed:", err)
	}
}
