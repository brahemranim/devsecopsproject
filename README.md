# MERN ToDo App (JWT auth) — Dockerized

This repository contains a complete MERN (MongoDB, Express, React, Node) To-Do application with JWT authentication and Docker containerization for backend and frontend using standalone Dockerfiles (no docker-compose).

Features
- User registration & login (JWT)
- Protected task API (create/read/update/delete)
- React + Vite frontend using MUI
 - Dockerfiles for frontend/backend (MongoDB can be run as a standalone container)

Prerequisites
- Docker installed

Run (development / production with containers)

1. Copy `.env.example` to `.env` and set values (JWT secret)

2. Build and run with Dockerfiles (example)

Start a MongoDB container (data persisted to a Docker volume):

```powershell
docker volume create todo-mongo-data
docker run -d --name todo-mongo -p 27017:27017 -v todo-mongo-data:/data/db mongo:6
```

Build and run the backend:

```powershell
docker build -f backend/Dockerfile -t myuser/todo-backend:latest backend
docker run -d --name todo-backend -p 5000:5000 --env-file .env --link todo-mongo:mongo myuser/todo-backend:latest
```

Build and run the frontend (nginx):

```powershell
docker build -f frontend/Dockerfile -t myuser/todo-frontend:latest frontend
docker run -d --name todo-frontend -p 80:80 myuser/todo-frontend:latest
```

Replace `myuser` with your Docker Hub username if you plan to push images. These steps avoid docker-compose and run each service from its Dockerfile.

Services
- Frontend: http://localhost (nginx, port 80)
- Backend: http://localhost:5000 (API under /api)
- MongoDB: mongodb://localhost:27017 (data persisted in Docker volume)

API endpoints
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password } -> returns { token, user }
- GET /api/tasks (Bearer token)
- POST /api/tasks { title } (Bearer token)
- PUT /api/tasks/:id (Bearer token)
- DELETE /api/tasks/:id (Bearer token)

Notes
- The example stores JWT in localStorage for simplicity. For production consider setting HttpOnly secure cookies from the backend and strict CORS.
- The backend waits and retries connection to MongoDB until available.

Folder structure (top-level)

```
.env.example
README.md
backend/
frontend/
```

If you want, I can:
- Switch to HttpOnly cookie-based JWT storage (safer)
- Add unit tests and a Docker healthcheck
- Add a seed script
