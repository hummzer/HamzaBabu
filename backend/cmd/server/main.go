package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/hummzer/HamzaBabu/internal/auth"
	"github.com/hummzer/HamzaBabu/internal/config"
	"github.com/hummzer/HamzaBabu/internal/db"
)

func main() {
	// 1. Load Configuration
	cfg, err := config.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	// 2. Database Connection
	conn, err := db.NewConnection(cfg)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	defer conn.Close()

	// 3. Initialize Stores & Makers
	userStore := db.NewSQLUserStore(conn)
	tokenMaker, err := auth.NewJWTMaker(cfg.JWTSecret) // Or NewPasetoMaker
	if err != nil {
		log.Fatal("cannot create token maker:", err)
	}

	// 4. Initialize Handlers
	authHandler := auth.NewAuthHandler(cfg, tokenMaker, userStore)

	// 5. Setup Router
	server := gin.Default()

	authRoutes := server.Group("/auth")
	{
		authRoutes.GET("/login/github", authHandler.GitHubLogin)
		authRoutes.GET("/callback/github", authHandler.GitHubCallback)
	}

	log.Printf("Nexus Backend starting on :8080")
	err = server.Run(":8080")
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
