package auth

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/salimhamza/nexus/internal/config"
	"github.com/salimhamza/nexus/internal/models"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

type AuthHandler struct {
	config     config.Config
	tokenMaker Maker
	userStore  models.UserStore
	oauthConf  *oauth2.Config
}

func NewAuthHandler(config config.Config, tokenMaker Maker, userStore models.UserStore) *AuthHandler {
	return &AuthHandler{
		config:     config,
		tokenMaker: tokenMaker,
		userStore:  userStore,
		oauthConf: &oauth2.Config{
			ClientID:     config.GitHubClientID,
			ClientSecret: config.GitHubClientSecret,
			Endpoint:     github.Endpoint,
			RedirectURL:  "http://localhost:8080/auth/callback/github",
			Scopes:       []string{"user:email"},
		},
	}
}

// GitHubLogin redirects to GitHub's OAuth page
func (h *AuthHandler) GitHubLogin(ctx *gin.Context) {
	url := h.oauthConf.AuthCodeURL("state-token") // In production, use a secure random state
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}

// GitHubCallback handles the redirect from GitHub
func (h *AuthHandler) GitHubCallback(ctx *gin.Context) {
	code := ctx.Query("code")
	if code == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Code not found"})
		return
	}

	token, err := h.oauthConf.Exchange(context.Background(), code)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange token"})
		return
	}

	client := h.oauthConf.Client(context.Background(), token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}
	defer resp.Body.Close()

	var githubUser struct {
		ID    int64  `json:"id"`
		Login string `json:"login"`
		Email string `json:"email"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&githubUser); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode user info"})
		return
	}

	// 1. Check if user exists by GitHub ID
	user, err := h.userStore.GetUserByGitHubID(ctx, githubUser.ID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			// 2. Create new user if not found
			newID, _ := uuid.NewRandom()
			user = &models.User{
				ID:       newID,
				Email:    githubUser.Email,
				GitHubID: githubUser.ID,
			}
			err = h.userStore.CreateUser(ctx, user)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
				return
			}
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}
	}

	// 3. Generate our own access token
	accessToken, _, err := h.tokenMaker.CreateToken(user.ID, h.config.AccessTokenDuration)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create access token"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"access_token": accessToken,
		"user":         user,
	})
}
