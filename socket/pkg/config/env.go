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
			MongoUriPublic:  getEnv("MONGO_URI_PUBLIC", ""),
			MongoUriPrivate: getEnv("MONGO_URI_PRIVATE", ""),
			ClientUrl:       getEnv("CLIENT", "http://localhost:5173"),
			Port:            ":" + getEnv("PORT", "8080"),
		}
	})
	return envConfig
}

func getEnv(key, defaultVal string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultVal
	}
	return value
}
