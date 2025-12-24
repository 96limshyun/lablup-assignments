from typing import List, Dict
from fastapi import WebSocket
import json


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.chat_rooms: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except Exception:
                disconnected.append(connection)
        
        for connection in disconnected:
            self.disconnect(connection)

    async def connect_to_room(self, room_id: str, websocket: WebSocket):
        await websocket.accept()
        if room_id not in self.chat_rooms:
            self.chat_rooms[room_id] = []
        self.chat_rooms[room_id].append(websocket)

    def disconnect_from_room(self, room_id: str, websocket: WebSocket):
        if room_id in self.chat_rooms and websocket in self.chat_rooms[room_id]:
            self.chat_rooms[room_id].remove(websocket)
            if len(self.chat_rooms[room_id]) == 0:
                del self.chat_rooms[room_id]

    async def broadcast_to_room(self, room_id: str, message: dict):
        if room_id not in self.chat_rooms:
            return
        
        disconnected = []
        for connection in self.chat_rooms[room_id]:
            try:
                await connection.send_text(json.dumps(message))
            except Exception:
                disconnected.append(connection)
        
manager = ConnectionManager()

