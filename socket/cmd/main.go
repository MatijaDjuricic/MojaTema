package main

import (
	"github.com/MatijaDjuricic/MojaTema/socket/internal/chat"
	"github.com/MatijaDjuricic/MojaTema/socket/internal/message"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/config"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/db"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/logger"
)

func main() {
	env := config.GetEnvConfig()
	log := logger.NewLogger()
	server := config.NewServer(env.Port)
	DBService, err := db.Connect(env.MongoUriPrivate)
	if err != nil {
		log.Error("Error connecting to database:", err)
	}
	chat.DBService = DBService
	message.DBService = DBService
	defer db.Close(DBService)
	if err := server.Run(); err != nil {
		log.Error("Server run failed:", err)
	}
	log.Info("Server listening on %s...", env.Port)
}
