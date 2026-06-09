package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/salimhamza/nexus/internal/config"
)

// NewConnection creates a new database connection
func NewConnection(config config.Config) (*sql.DB, error) {
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.DBHost, config.DBPort, config.DBUser, config.DBPassword, config.DBName,
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
