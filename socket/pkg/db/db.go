package db

import (
	"context"
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
		if cancel == nil {
			return
		}
		client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
		if err != nil {
			return
		}
		if err = client.Ping(ctx, readpref.Primary()); err != nil {
			return
		}
		DbService = &DBService{
			Client: client,
			Ctx:    ctx,
			Cancel: cancel,
		}
	})
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
