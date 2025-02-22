package chat

import (
	"encoding/json"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/MatijaDjuricic/MojaTema/socket/internal/message"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/db"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/logger"

	"github.com/gorilla/websocket"
)

type ChatHandler struct {
	upgrader  websocket.Upgrader
	clients   map[string]*websocket.Conn
	log       *logger.Logger
	mu        sync.Mutex
	DBService *db.DBService
}

func getClientKey(senderId int, receiverId int) string {
	return strconv.Itoa(senderId) + "_" + strconv.Itoa(receiverId)
}

func NewChatHandler(dbService *db.DBService) *ChatHandler {
	upgrader := websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
	clients := make(map[string]*websocket.Conn)
	log := logger.NewLogger()
	return &ChatHandler{
		upgrader:  upgrader,
		clients:   clients,
		log:       log,
		DBService: dbService,
	}
}

func (h *ChatHandler) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := h.upgrader.Upgrade(w, r, nil)
	if err != nil {
		h.log.Error("Upgrade error:", err)
		return
	}
	senderId, errSid := strconv.Atoi(r.URL.Query().Get("sender_id"))
	receiverId, errRid := strconv.Atoi(r.URL.Query().Get("receiver_id"))
	if errSid != nil || errRid != nil {
		h.log.Error("sender_id or receiver_id not provided", errSid, errRid)
		return
	}
	clientKey := getClientKey(senderId, receiverId)
	h.mu.Lock()
	delete(h.clients, clientKey)
	h.clients[clientKey] = conn
	h.mu.Unlock()
	go func() {
		defer conn.Close()
		h.ReadMessages(conn, senderId, receiverId)
	}()
}

func (h *ChatHandler) ReadMessages(conn *websocket.Conn, senderId, receiverId int) {
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
				h.log.Info("Connection closed normally")
			} else {
				h.log.Error("Unexpected WebSocket error:", err)
			}
			clientKey := getClientKey(senderId, receiverId)
			h.mu.Lock()
			delete(h.clients, clientKey)
			h.mu.Unlock()
			return
		}
		newMessage := &message.Message{
			SenderId:   senderId,
			ReceiverId: receiverId,
			Content:    string(msg),
			Timestamp:  time.Now().Unix(),
		}
		_, err = message.InsertMessage(h.DBService, newMessage)
		if err != nil {
			h.log.Error("Error saving message:", err)
		}
		messageJSON, err := json.Marshal(newMessage)
		if err != nil {
			h.log.Error("Error marshalling message to JSON:", err)
			continue
		}
		h.SendToReceiver(senderId, receiverId, string(messageJSON))
	}
}

func (h *ChatHandler) SendToReceiver(senderId int, receiverId int, msg string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	clientKey := getClientKey(receiverId, senderId)
	if receiverConn, exists := h.clients[clientKey]; exists {
		err := receiverConn.WriteMessage(websocket.TextMessage, []byte(msg))
		if err != nil {
			h.log.Error("Error sending message to receiver:", err)
		}
	} else {
		h.log.Warn("Receiver %d is not online", receiverId)
	}
}
