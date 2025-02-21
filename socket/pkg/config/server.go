package config

import (
	"net/http"

	"github.com/MatijaDjuricic/MojaTema/socket/pkg/middleware"
)

type Server struct {
	Addr    string
	Handler *http.ServeMux
}

func NewServer(addr string) *Server {
	router := http.NewServeMux()
	return &Server{
		Addr:    addr,
		Handler: router,
	}
}

func (s *Server) Run() error {
	server := &http.Server{
		Addr:    s.Addr,
		Handler: middleware.AllowCors(s.Handler),
	}
	return server.ListenAndServe()
}
