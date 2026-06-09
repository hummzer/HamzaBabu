# Nexus Project - Root Commands

This file documents the status of the Nexus project setup and the commands to manage it.

## Week 1 Status: COMPLETED ✅
- [x] Git Repository Initialized
- [x] Monorepo Folder Structure
- [x] Frontend Scaffold (Vite + React + TS + Tailwind)
- [x] Backend Boilerplate (Go + Gin-ready structure)
- [x] Docker Compose (Postgres, Redis, Backend, Frontend)
- [x] Initial Postgres Schema

## Remaining for Initial Setup
- [ ] Connect to GitHub/GitLab Remote
- [ ] Perform first Push

---

## Commands Reference

### 1. Infrastructure
Start all services (Postgres, Redis, Backend, Frontend):
```bash
docker-compose -f infra/docker-compose.yml up -d
```

### 2. Database Migrations
Apply the initial schema:
```bash
cd backend
go run ./cmd/migrate up
```

### 3. Development Mode
**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend:**
```bash
cd backend
go run ./cmd/server/main.go
```

### 4. Git Remote Setup
Run these to link and push to your new repo:
```bash
git remote add origin <YOUR_REMOTE_URL>
git branch -M main
git push -u origin main
```

---

## Folder Architecture

```
nexus/
├── frontend/                  # Vite + React + TS
├── backend/                   # Go API
│   ├── cmd/
│   │   ├── server/            # Main API entry
│   │   └── migrate/           # DB Migration runner
│   ├── internal/              # Core logic (auth, marketplace, etc.)
│   └── pkg/                   # Shared packages
├── infra/                     # Docker & Traefik config
└── rootCommand.md             # Project roadmap & commands
```
