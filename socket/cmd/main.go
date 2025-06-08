package main

import (
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/config"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/db"
	"github.com/MatijaDjuricic/MojaTema/socket/pkg/logger"
)

func main() {
	env := config.GetEnvConfig()
	log := logger.NewLogger()
	server := config.NewServer(env.Port)
	if err := db.Connect(env.MongoUri); err != nil {
		log.Error("Error connecting to database:", err)
	}
	defer db.Close()
	routeHandler := config.NewRouteHandler()
	routeHandler.InitializeRoutes(server.Handler)
	log.Info("Server listening on %s...", env.Port)
	if err := server.Run(); err != nil {
		log.Error("Server run failed:", err)
	}
}
