package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/salimhamza/nexus/internal/config"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

type AuthHandler struct {
	config     config.Config
	tokenMaker Maker
	oauthConf  *oauth2.Config
}

func NewAuthHandler(config config.Config, tokenMaker Maker) *AuthHandler {
	return &AuthHandler{
		config:     config,
		tokenMaker: tokenMaker,
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

	var user struct {
		ID    int    `json:"id"`
		Login string `json:"login"`
		Email string `json:"email"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode user info"})
		return
	}

	// Here we would typically save the user to the database if they don't exist
	// and then generate our own JWT/PASETO token for them.
	
	fmt.Printf("User logged in: %s (%s)\n", user.Login, user.Email)

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged in with GitHub",
		"user":    user,
	})
}
