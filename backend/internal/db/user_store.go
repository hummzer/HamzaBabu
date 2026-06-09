package db

import (
	"context"
	"database/sql"

	"github.com/hummzer/HamzaBabu/internal/models"
)

type SQLUserStore struct {
	db *sql.DB
}

func NewSQLUserStore(db *sql.DB) *SQLUserStore {
	return &SQLUserStore{db: db}
}

func (s *SQLUserStore) CreateUser(ctx context.Context, user *models.User) error {
	query := `
		INSERT INTO users (id, email, github_id, password_hash)
		VALUES ($1, $2, $3, $4)
		RETURNING created_at, updated_at
	`
	return s.db.QueryRowContext(ctx, query, user.ID, user.Email, user.GitHubID, user.PasswordHash).
		Scan(&user.CreatedAt, &user.UpdatedAt)
}

func (s *SQLUserStore) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `SELECT id, email, github_id, password_hash, created_at, updated_at FROM users WHERE email = $1`
	user := &models.User{}
	err := s.db.QueryRowContext(ctx, query, email).
		Scan(&user.ID, &user.Email, &user.GitHubID, &user.PasswordHash, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (s *SQLUserStore) GetUserByGitHubID(ctx context.Context, githubID int64) (*models.User, error) {
	query := `SELECT id, email, github_id, password_hash, created_at, updated_at FROM users WHERE github_id = $1`
	user := &models.User{}
	err := s.db.QueryRowContext(ctx, query, githubID).
		Scan(&user.ID, &user.Email, &user.GitHubID, &user.PasswordHash, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}
