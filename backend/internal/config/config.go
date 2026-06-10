package config

import (
	"time"

	"github.com/spf13/viper"
)

// Config stores all configuration of the application.
// The values are read by viper from a config file or environment variable.
type Config struct {
	DBUser               string        `mapstructure:"DB_USER"`
	DBPassword           string        `mapstructure:"DB_PASSWORD"`
	DBName               string        `mapstructure:"DB_NAME"`
	DBHost               string        `mapstructure:"DB_HOST"`
	DBPort               string        `mapstructure:"DB_PORT"`
	RedisHost            string        `mapstructure:"REDIS_HOST"`
	RedisPort            string        `mapstructure:"REDIS_PORT"`
	JWTSecret            string        `mapstructure:"JWT_SECRET"`
	AccessTokenDuration  time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	RefreshTokenDuration time.Duration `mapstructure:"REFRESH_TOKEN_DURATION"`
	GitHubClientID       string        `mapstructure:"GITHUB_CLIENT_ID"`
	GitHubClientSecret   string        `mapstructure:"GITHUB_CLIENT_SECRET"`
	StripeAPIKey         string        `mapstructure:"STRIPE_API_KEY"`
	StripeWebhookSecret  string        `mapstructure:"STRIPE_WEBHOOK_SECRET"`
}

// LoadConfig reads configuration from file or environment variables.
func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName(".env")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	// Handle case where config file is missing
	if err = viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return
		}
	}

	// This allows Viper to unmarshal environment variables even if no config file is loaded
	for _, field := range []string{"DB_USER", "DB_PASSWORD", "DB_NAME", "DB_HOST", "DB_PORT", "REDIS_HOST", "REDIS_PORT", "JWT_SECRET", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", "STRIPE_API_KEY", "STRIPE_WEBHOOK_SECRET"} {
		viper.BindEnv(field)
	}

	err = viper.Unmarshal(&config)
	
	// Set defaults if not provided in .env
	if config.AccessTokenDuration == 0 {
		config.AccessTokenDuration = 15 * time.Minute
	}
	if config.RefreshTokenDuration == 0 {
		config.RefreshTokenDuration = 24 * time.Hour
	}

	return
}
