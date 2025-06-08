package config

import (
	"fmt"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

type EnvConfig struct {
	MongoUri  string
	ClientUrl string
	Port      string
}

var (
	once      sync.Once
	envConfig *EnvConfig
)

func GetEnvConfig() *EnvConfig {
	once.Do(func() {
		if err := godotenv.Load(".env"); err != nil {
			fmt.Println("Error loading .env file", err)
		}
		envConfig = &EnvConfig{
			MongoUri:  GetEnv("MONGO_URI", "mongodb://mongo:27017"),
			ClientUrl: GetEnv("CLIENT", "http://localhost:5173"),
			Port:      ":" + GetEnv("PORT", "8080"),
		}
	})
	return envConfig
}

func GetEnv(key, defaultVal string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultVal
	}
	return value
}
