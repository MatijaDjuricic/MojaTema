package message

import (
	"fmt"

	"github.com/MatijaDjuricic/MojaTema/socket/pkg/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	dbName  string = "MojaTema"
	colName string = "messages"
)

type Message struct {
	Id         primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	SenderId   int                `json:"senderId" bson:"sender_id"`
	ReceiverId int                `json:"receiverId" bson:"receiver_id"`
	Content    string             `json:"content" bson:"content"`
	Timestamp  int64              `json:"timestamp" bson:"timestamp"`
}

func InsertMessage(dbService *db.DBService, message *Message) (*mongo.InsertOneResult, error) {
	result, err := db.InsertOne(dbService, dbName, colName, message)
	return result, err
}

func GetMessages(dbService *db.DBService) ([]Message, error) {
	collection := db.GetCollection(dbService, dbName, colName)
	cursor, err := collection.Find(dbService.Ctx, map[string]interface{}{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(dbService.Ctx)
	var messages []Message
	for cursor.Next(dbService.Ctx) {
		var msg Message
		if err := cursor.Decode(&msg); err != nil {
			return nil, err
		}
		messages = append(messages, msg)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return messages, nil
}

func GetMessagesFromChat(dbService *db.DBService, senderId int, receiverId int) []Message {
	collection := db.GetCollection(dbService, dbName, colName)
	cursor, err := collection.Find(dbService.Ctx, bson.M{
		"$or": []bson.M{
			{"sender_id": senderId, "receiver_id": receiverId},
			{"sender_id": receiverId, "receiver_id": senderId},
		},
	})
	if err != nil {
		return nil
	}
	defer cursor.Close(dbService.Ctx)
	var messages []Message
	for cursor.Next(dbService.Ctx) {
		var msg Message
		if err := cursor.Decode(&msg); err != nil {
			return nil
		}
		messages = append(messages, msg)
	}
	if err := cursor.Err(); err != nil {
		return nil
	}
	return messages
}

func GetMessageById(dbService *db.DBService, id string) *Message {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil
	}
	var message Message
	collection := db.GetCollection(dbService, dbName, colName)
	err = collection.FindOne(dbService.Ctx, map[string]interface{}{"_id": objectID}).Decode(&message)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil
		}
		return nil
	}
	return &message
}

func DeleteMessageById(dbService *db.DBService, id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil
	}
	collection := db.GetCollection(dbService, dbName, colName)
	result, err := collection.DeleteOne(dbService.Ctx, map[string]interface{}{"_id": objectID})
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return fmt.Errorf("no document found with id %s", id)
	}
	return nil
}
