# Docker Management Commands

Use these commands to manage the Nexus infrastructure. All commands should be run from the **project root**.

## Start Services
Starts Postgres, Redis, Backend, and Frontend in the background.
```bash
docker-compose -f backend/infra/docker-compose.yml up -d
```

## Stop Services
Stops the containers but keeps them created.
```bash
docker-compose -f backend/infra/docker-compose.yml stop
```

## Shutdown & Remove
Stops and removes the containers and networks.
```bash
docker-compose -f backend/infra/docker-compose.yml down
```

## Remove Everything (Including Volumes)
**Warning:** This will delete your database data.
```bash
docker-compose -f backend/infra/docker-compose.yml down -v
```

## View Logs
```bash
docker-compose -f backend/infra/docker-compose.yml logs -f
```

## Rebuild Services
Use this if you change code in the Backend or Frontend and want to update the containers.
```bash
docker-compose -f backend/infra/docker-compose.yml up -d --build
```
