package message

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/MatijaDjuricic/MojaTema/socket/pkg/db"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/logger"
)

type MessageHandler struct {
	DBService *db.DBService
	log       *logger.Logger
}

func NewMessageHandler(dbService *db.DBService) *MessageHandler {
	log := logger.NewLogger()
	return &MessageHandler{
		DBService: dbService,
		log:       log,
	}
}

func (h *MessageHandler) HandleGetMessages(w http.ResponseWriter, r *http.Request) {
	messages, err := GetMessages(h.DBService)
	if err != nil {
		h.log.Error("Error getting messages:", err)
		http.Error(w, "Error retrieving messages", http.StatusInternalServerError)
		return
	}
	response, err := json.Marshal(messages)
	if err != nil {
		h.log.Error("Error marshalling messages:", err)
		http.Error(w, "Error formatting messages", http.StatusInternalServerError)
		return
	}
	w.Write(response)
}

func (h *MessageHandler) HandleGetMessageById(w http.ResponseWriter, r *http.Request) {
	Id := r.PathValue("id")
	if Id == "" {
		h.log.Error("message id not provided")
		return
	}
	message := GetMessageById(h.DBService, Id)
	response, err := json.Marshal(message)
	if err != nil {
		http.Error(w, "Error formatting message", http.StatusInternalServerError)
		return
	}
	w.Write(response)
}

func (h *MessageHandler) HandleDeleteMessageById(w http.ResponseWriter, r *http.Request) {
	Id := r.PathValue("id")
	if Id == "" {
		h.log.Error("message id not provided")
		return
	}
	err := DeleteMessageById(h.DBService, Id)
	if err != nil {
		h.log.Error("Error:", err)
		http.Error(w, "Error deleting message", http.StatusInternalServerError)
		return
	}
	w.Write([]byte("Message deleted successfully!"))
}

func (h *MessageHandler) HandleGetMessagesFromChat(w http.ResponseWriter, r *http.Request) {
	senderId, errSid := strconv.Atoi(r.URL.Query().Get("sender_id"))
	receiverId, errRid := strconv.Atoi(r.URL.Query().Get("receiver_id"))
	if errSid != nil || errRid != nil {
		h.log.Error("sender_id or receiver_id not provided", errSid, errRid)
		return
	}
	if h.DBService == nil {
		http.Error(w, "Database not initialized", http.StatusInternalServerError)
		return
	}
	messages := GetMessagesFromChat(h.DBService, senderId, receiverId)
	response, err := json.Marshal(messages)
	if err != nil {
		http.Error(w, "Error formatting messages", http.StatusInternalServerError)
		return
	}
	w.Write(response)
}
