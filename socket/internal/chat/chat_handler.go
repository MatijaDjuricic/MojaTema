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

var (
	upgrader  = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
	clients   = make(map[int]*websocket.Conn)
	log       = logger.NewLogger()
	mu        sync.Mutex
	DBService *db.DBService
)

func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Error("Upgrade error:", err)
		return
	}
	senderId, errSid := strconv.Atoi(r.URL.Query().Get("sender_id"))
	receiverId, errRid := strconv.Atoi(r.URL.Query().Get("receiver_id"))
	if errSid != nil || errRid != nil {
		log.Error("sender_id or receiver_id not provided", errSid, errRid)
		return
	}
	mu.Lock()
	clients[senderId] = conn
	mu.Unlock()
	go func() {
		defer conn.Close()
		ReadMessages(conn, senderId, receiverId)
	}()
}

func ReadMessages(conn *websocket.Conn, senderId, receiverId int) {
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
				log.Info("Connection closed normally")
			} else {
				log.Error("Unexpected WebSocket error:", err)
			}
			mu.Lock()
			delete(clients, senderId)
			mu.Unlock()
			return
		}
		newMessage := &message.Message{
			SenderId:   senderId,
			ReceiverId: receiverId,
			Content:    string(msg),
			Timestamp:  time.Now().Unix(),
		}
		_, err = message.InsertMessage(DBService, newMessage)
		if err != nil {
			log.Error("Error saving message:", err)
		}
		messageJSON, err := json.Marshal(newMessage)
		if err != nil {
			log.Error("Error marshalling message to JSON:", err)
			continue
		}
		SendToReceiver(receiverId, string(messageJSON))
	}
}

func SendToReceiver(receiverId int, msg string) {
	mu.Lock()
	defer mu.Unlock()
	if receiverConn, exists := clients[receiverId]; exists {
		err := receiverConn.WriteMessage(websocket.TextMessage, []byte(msg))
		if err != nil {
			log.Error("Error sending message to receiver:", err)
		}
	} else {
		log.Warn("Receiver %d is not online", receiverId)
	}
}
