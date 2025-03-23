package config

import (
	"fmt"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

type EnvConfig struct {
	MongoUriPublic  string
	MongoUriPrivate string
	ClientUrl       string
	Port            string
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
			MongoUriPublic:  GetEnv("MONGO_URI_PUBLIC", ""),
			MongoUriPrivate: GetEnv("MONGO_URI_PRIVATE", "mongodb://mongo:27017"),
			ClientUrl:       GetEnv("CLIENT", "http://localhost:5173"),
			Port:            ":" + GetEnv("PORT", "8080"),
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
