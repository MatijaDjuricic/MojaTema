package message

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/MatijaDjuricic/pkg/db"
	"github.com/MatijaDjuricic/pkg/logger"
)

var (
	log       = logger.NewLogger(logger.INFO)
	DBService *db.DBService
)

func handleCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
}

func HandleGetMessages(w http.ResponseWriter, r *http.Request) {
	handleCORS(w, r)
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	if DBService == nil {
		http.Error(w, "Database not initialized", http.StatusInternalServerError)
		return
	}
	messages, err := db.GetMessages(DBService)
	if err != nil {
		log.Error("Error getting messages:", err)
		http.Error(w, "Error retrieving messages", http.StatusInternalServerError)
		return
	}
	response, err := json.Marshal(messages)
	if err != nil {
		log.Error("Error marshalling messages:", err)
		http.Error(w, "Error formatting messages", http.StatusInternalServerError)
		return
	}
	w.Write(response)
}

func HandleGetMessagesFromChat(w http.ResponseWriter, r *http.Request) {
	handleCORS(w, r)
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	senderId, errSid := strconv.Atoi(r.URL.Query().Get("sender_id"))
	receiverId, errRid := strconv.Atoi(r.URL.Query().Get("receiver_id"))
	if errSid != nil || errRid != nil {
		log.Error("sender_id or receiver_id not provided", errSid, errRid)
		return
	}
	if DBService == nil {
		http.Error(w, "Database not initialized", http.StatusInternalServerError)
		return
	}
	messages := db.GetMessagesFromChat(DBService, senderId, receiverId)
	response, err := json.Marshal(messages)
	if err != nil {
		http.Error(w, "Error formatting messages", http.StatusInternalServerError)
		return
	}
	w.Write(response)
}
