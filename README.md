# Lablup Assignments - Real-time Chat Application

## 1. Project Introduction

A real-time chat application that supports real-time message sending and receiving using WebSocket, and message caching through Redis.

### Key Features

- Real-time chat message sending and receiving
- Chat room creation and management
- Redis-based message caching
- Real-time updates via WebSocket

## 2. Tech Stack

### Backend

- **FastAPI**: Asynchronous web framework
- **PostgreSQL**: Relational database
- **Redis**: Caching and session management
- **SQLAlchemy**: ORM
- **WebSocket**: Real-time bidirectional communication
- **Uvicorn**: ASGI server

### Frontend

- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing

### Infrastructure

- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## 4. Project Structure

```
lablup-assignments/
├── backend/                    # Backend application
│   ├── app/
│   │   ├── cache/              # Redis caching utilities
│   │   │   ├── cache_utils.py
│   │   │   └── redis_client.py
│   │   ├── db/                 # Database related
│   │   │   ├── database.py     # DB connection settings
│   │   │   └── models.py       # SQLAlchemy models
│   │   ├── routers/            # API routers
│   │   │   ├── room.py         # Chat room related endpoints
│   │   │   ├── chat_message.py # Message related endpoints
│   │   │   └── websocket.py    # WebSocket endpoints
│   │   ├── config.py           # Configuration management
│   │   ├── main.py             # FastAPI application entry point
│   │   └── websocket_manager.py # WebSocket connection management
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/                   # Frontend application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── MainContainer.tsx
│   │   │   ├── MessagePanel.tsx
│   │   │   └── RoomListView.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── chatRoom/       # Chat room page
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useChatManagement.tsx
│   │   │   │   └── index.tsx
│   │   │   └── home/           # Home page
│   │   │       ├── hooks/
│   │   │       │   └── useRoomManagement.tsx
│   │   │       └── index.tsx
│   │   ├── routers/            # Routing configuration
│   │   │   └── routes.tsx
│   │   ├── services/           # API services
│   │   │   └── fetch.ts
│   │   └── types/              # TypeScript type definitions
│   │       └── index.ts
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml          # Docker Compose configuration
```

## 5. Installation and Running

### Prerequisites

- Docker and Docker Compose installed
- Or Python 3.12+ and Node.js 20+ installed (for local development)

### Running with Docker Compose (Recommended)

1. **Clone the project**

```bash
git clone <repository-url>
cd lablup-assignments
```

2. **Environment Variables (Optional)**
   The application will run with default settings if `.env` files are not present. You can configure environment variables as needed.

   **Backend Environment Variables** (`backend/.env`):

```env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@postgres:5432/chatdb
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_EXPIRE_SECONDS=3600
MAX_CACHED_MESSAGES=50
APP_NAME=Chat Server
DEBUG=false
```

**Frontend Environment Variables** (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Default Values**:

Backend:

- `DATABASE_URL`: `postgresql+asyncpg://postgres:postgres@localhost:5432/chatdb`
- `REDIS_HOST`: `localhost`
- `REDIS_PORT`: `6379`
- `REDIS_PASSWORD`: `None` (optional)
- `CACHE_EXPIRE_SECONDS`: `3600`
- `MAX_CACHED_MESSAGES`: `50`
- `APP_NAME`: `Chat Server`
- `DEBUG`: `true`

Frontend:

- `VITE_API_BASE_URL`: `http://localhost:8000`

3. **Run services with Docker Compose**

```bash
docker-compose up -d
```

4. **Access services**

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

5. **Stop services**

```bash
docker-compose down
```
