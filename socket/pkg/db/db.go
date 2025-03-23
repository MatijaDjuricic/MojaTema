package db

import (
	"context"
	"log"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type DBService struct {
	Client *mongo.Client
	Ctx    context.Context
	Cancel context.CancelFunc
}

var (
	once      sync.Once
	DbService *DBService
)

func Connect(uri string) error {
	var err error
	once.Do(func() {
		ctx, cancel := context.WithCancel(context.Background())
		client, connectErr := mongo.Connect(ctx, options.Client().ApplyURI(uri))
		if connectErr != nil {
			log.Printf("Failed to connect to MongoDB: %v", connectErr)
			cancel()
			err = connectErr
			return
		}
		if pingErr := client.Ping(ctx, readpref.Primary()); pingErr != nil {
			log.Printf("Failed to ping MongoDB: %v", pingErr)
			cancel()
			err = pingErr
			return
		}
		DbService = &DBService{
			Client: client,
			Ctx:    ctx,
			Cancel: cancel,
		}
		log.Println("Connected to MongoDB successfully!")
	})
	if err != nil {
		log.Printf("Error during MongoDB connection: %v", err)
	}
	return err
}

func Close() {
	if DbService != nil {
		defer DbService.Cancel()
		if err := DbService.Client.Disconnect(DbService.Ctx); err != nil {
			panic(err)
		}
	}
}

func PingDB(dbService *DBService) error {
	return dbService.Client.Ping(dbService.Ctx, readpref.Primary())
}

func GetCollection(dbService *DBService, dbName string, colName string) *mongo.Collection {
	return dbService.Client.Database(dbName).Collection(colName)
}

func InsertOne(dbService *DBService, dbName string, colName string, doc interface{}) (*mongo.InsertOneResult, error) {
	collection := dbService.Client.Database(dbName).Collection(colName)
	result, err := collection.InsertOne(dbService.Ctx, doc)
	return result, err
}

func InsertMany(dbService *DBService, dbName string, colName string, docs []interface{}) (*mongo.InsertManyResult, error) {
	collection := dbService.Client.Database(dbName).Collection(colName)
	result, err := collection.InsertMany(dbService.Ctx, docs)
	return result, err
}
