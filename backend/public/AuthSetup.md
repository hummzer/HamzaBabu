# Week 2: Auth System Setup Commands

Since I cannot execute Go commands in this environment, please run the following commands in your terminal to install the necessary dependencies and finalize the setup.

### 1. Install Go Dependencies
Run these from the `backend/` directory:

```bash
cd backend
go get github.com/golang-jwt/jwt/v5
go get github.com/google/uuid
go get github.com/gin-gonic/gin
go get golang.org/x/crypto/bcrypt
go get github.com/aidarkhanov/paseto
go get golang.org/x/oauth2
go get github.com/spf13/viper
go get github.com/lib/pq
go mod tidy
```

### 2. Verify Auth Scaffolding
I have created the following files in `feat/auth-system-implementation` branch:
- `internal/models/user.go`: Basic user struct.
- `internal/auth/maker.go`: Token maker interface and payload.
- `internal/auth/errors.go`: Auth errors.
- `internal/auth/jwt_maker.go`: JWT implementation.
- `internal/auth/paseto_maker.go`: PASETO implementation.
- `internal/middleware/auth.go`: Gin auth middleware.
- `internal/config/config.go`: Configuration loader (Viper).
- `internal/auth/handler.go`: GitHub OAuth handler.

### 3. Next Steps in Development
- **Database Integration**: Save GitHub users to Postgres.
- **Frontend Integration**: Build the login button and handle tokens in React.
