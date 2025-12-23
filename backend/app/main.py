from fastapi import FastAPI, WebSocket
from contextlib import asynccontextmanager
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db import init_db
from app.routers import room


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
    except Exception as e:
        print(f"데이터베이스 초기화 실패: {e}")
    
    yield

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(room.router)


@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Server is running!",
    }


@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message received: {data}, room_id: {room_id}")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

