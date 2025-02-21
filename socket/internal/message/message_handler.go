package message

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/MatijaDjuricic/MojaTema/socket/pkg/db"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/logger"
)

var (
	log       = logger.NewLogger()
	DBService *db.DBService
)

func HandleGetMessages(w http.ResponseWriter, r *http.Request) {
	messages, err := GetMessages(DBService)
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

func HandleGetMessageById(w http.ResponseWriter, r *http.Request) {
	Id := r.PathValue("id")
	if Id == "" {
		log.Error("message id not provided")
		return
	}
	message := GetMessageById(DBService, Id)
	response, err := json.Marshal(message)
	if err != nil {
		http.Error(w, "Error formatting message", http.StatusInternalServerError)
		return
	}
	w.Write(response)
}

func HandleDeleteMessageById(w http.ResponseWriter, r *http.Request) {
	Id := r.PathValue("id")
	if Id == "" {
		log.Error("message id not provided")
		return
	}
	err := DeleteMessageById(DBService, Id)
	if err != nil {
		log.Error("Error:", err)
		http.Error(w, "Error deleting message", http.StatusInternalServerError)
		return
	}
	w.Write([]byte("Message deleted successfully!"))
}

func HandleGetMessagesFromChat(w http.ResponseWriter, r *http.Request) {
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
	messages := GetMessagesFromChat(DBService, senderId, receiverId)
	response, err := json.Marshal(messages)
	if err != nil {
		http.Error(w, "Error formatting messages", http.StatusInternalServerError)
		return
	}
	w.Write(response)
}
