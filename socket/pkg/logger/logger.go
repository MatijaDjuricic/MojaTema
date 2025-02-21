package logger

import (
	"fmt"
	"log"
	"os"
	"time"
)

type LogLevel int

type Logger struct {
	level LogLevel
}

const (
	DEBUG LogLevel = iota
	INFO
	WARN
	ERROR
)

func NewLogger() *Logger {
	return &Logger{
		level: DEBUG,
	}
}

func (l *Logger) logMessage(level LogLevel, msg string, args ...interface{}) {
	if level < l.level {
		return
	}
	var levelString string
	switch level {
	case DEBUG:
		levelString = "[DEBUG]"
	case INFO:
		levelString = "[INFO]"
	case WARN:
		levelString = "[WARN]"
	case ERROR:
		levelString = "[ERROR]"
	}
	timestamp := time.Now().Format(time.RFC3339)
	logMessage := fmt.Sprintf("%s %s %s", timestamp, levelString, fmt.Sprintf(msg, args...))
	fmt.Println(logMessage)
	file, err := os.OpenFile("app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Error opening log file:", err)
		return
	}
	defer file.Close()
	log.SetOutput(file)
	log.Println(logMessage)
}

func (l *Logger) Debug(msg string, args ...interface{}) {
	l.logMessage(DEBUG, msg, args...)
}

func (l *Logger) Info(msg string, args ...interface{}) {
	l.logMessage(INFO, msg, args...)
}

func (l *Logger) Warn(msg string, args ...interface{}) {
	l.logMessage(WARN, msg, args...)
}

func (l *Logger) Error(msg string, err ...error) {
	l.logMessage(ERROR, msg, err)
}
