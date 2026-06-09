# Nexus Project Commands
## Initial Setup
`git init`
## Directory Architecture
`mkdir -p frontend backend/cmd/server backend/internal/auth backend/internal/marketplace backend/internal/licensing backend/internal/payments backend/internal/docs backend/pkg infra/traefik infra/postgres .github/workflows`
## Frontend Setup (Vite + React + TS)
`npm create vite@latest frontend -- --template react-ts`
## Backend Setup (Go Boilerplate)
`cd backend && go mod init github.com/salimhamza/nexus && touch cmd/server/main.go`
## Infrastructure
`docker-compose up -d`
