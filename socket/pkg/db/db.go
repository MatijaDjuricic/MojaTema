package db

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

const (
	dbName  string = "MojaTema"
	colName string = "messages"
)

type DBService struct {
	Client *mongo.Client
	Ctx    context.Context
	Cancel context.CancelFunc
}

type Message struct {
	SenderId   int    `json:"senderId" bson:"sender_id"`
	ReceiverId int    `json:"receiverId" bson:"receiver_id"`
	Content    string `json:"content" bson:"content"`
	Timestamp  int64  `json:"timestamp" bson:"timestamp"`
}

func InsertMessage(dbService *DBService, message *Message) (*mongo.InsertOneResult, error) {
	result, err := InsertOne(dbService, message)
	return result, err
}

func GetMessages(dbService *DBService) ([]Message, error) {
	collection := dbService.Client.Database(dbName).Collection(colName)
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

func GetMessagesFromChat(dbService *DBService, senderId int, receiverId int) []Message {
	collection := dbService.Client.Database(dbName).Collection(colName)
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

func Connect(uri string) (*DBService, error) {
	ctx := context.Background()
	cancel := func() {}
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return nil, err
	}
	return &DBService{
		Client: client,
		Ctx:    ctx,
		Cancel: cancel,
	}, nil
}

func Close(dbService *DBService) {
	defer dbService.Cancel()
	defer func() {
		if err := dbService.Client.Disconnect(dbService.Ctx); err != nil {
			panic(err)
		}
	}()
}

func PingDB(dbService *DBService) error {
	return dbService.Client.Ping(dbService.Ctx, readpref.Primary())
}

func InsertOne(dbService *DBService, doc interface{}) (*mongo.InsertOneResult, error) {
	collection := dbService.Client.Database(dbName).Collection(colName)
	result, err := collection.InsertOne(dbService.Ctx, doc)
	return result, err
}

func InsertMany(dbService *DBService, docs []interface{}) (*mongo.InsertManyResult, error) {
	collection := dbService.Client.Database(dbName).Collection(colName)
	result, err := collection.InsertMany(dbService.Ctx, docs)
	return result, err
}
