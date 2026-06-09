package auth

import (
	"fmt"
	"time"

	"github.com/aidarkhanov/paseto"
	"github.com/google/uuid"
)

// PasetoMaker is a PASETO token maker
type PasetoMaker struct {
	paseto       *paseto.V2
	symmetricKey []byte
}

// NewPasetoMaker creates a new PasetoMaker
func NewPasetoMaker(symmetricKey string) (Maker, error) {
	if len(symmetricKey) != 32 {
		return nil, fmt.Errorf("invalid key size: must be exactly 32 characters")
	}

	return &PasetoMaker{
		paseto:       paseto.NewV2(),
		symmetricKey: []byte(symmetricKey),
	}, nil
}

// CreateToken creates a new token for a specific user ID and duration
func (maker *PasetoMaker) CreateToken(userID uuid.UUID, duration time.Duration) (string, *Payload, error) {
	payload, err := NewPayload(userID, duration)
	if err != nil {
		return "", payload, err
	}

	claims := paseto.MapClaims{
		"id":         payload.ID.String(),
		"user_id":    payload.UserID.String(),
		"issued_at":  payload.IssuedAt.Format(time.RFC3339),
		"expired_at": payload.ExpiredAt.Format(time.RFC3339),
	}

	token, err := maker.paseto.Encrypt(maker.symmetricKey, claims, nil)
	return token, payload, err
}

// VerifyToken checks if a token is valid or not
func (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	claims := make(paseto.MapClaims)

	err := maker.paseto.Decrypt(token, maker.symmetricKey, &claims, nil)
	if err != nil {
		return nil, ErrInvalidToken
	}

	idStr, _ := claims["id"].(string)
	userIDStr, _ := claims["user_id"].(string)
	issuedAtStr, _ := claims["issued_at"].(string)
	expiredAtStr, _ := claims["expired_at"].(string)

	id, err := uuid.Parse(idStr)
	if err != nil {
		return nil, ErrInvalidToken
	}

	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		return nil, ErrInvalidToken
	}

	issuedAt, err := time.Parse(time.RFC3339, issuedAtStr)
	if err != nil {
		return nil, ErrInvalidToken
	}

	expiredAt, err := time.Parse(time.RFC3339, expiredAtStr)
	if err != nil {
		return nil, ErrInvalidToken
	}

	payload := &Payload{
		ID:        id,
		UserID:    userID,
		IssuedAt:  issuedAt,
		ExpiredAt: expiredAt,
	}

	if err := payload.Valid(); err != nil {
		return nil, err
	}

	return payload, nil
}
