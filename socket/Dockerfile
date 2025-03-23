FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod tidy

COPY . .

RUN go build -o socket ./cmd/main.go

RUN chmod +x ./socket

EXPOSE 8080

CMD ["./socket"]