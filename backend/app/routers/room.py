from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import uuid4
from pydantic import BaseModel

from app.db import get_db
from app.db.models import ChatRoom
from app.websocket_manager import manager
router = APIRouter(prefix="/rooms", tags=["rooms"])


class RoomCreate(BaseModel):
    user_id: str


@router.get("/")
async def get_rooms(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChatRoom))
    rooms = result.scalars().all()
    
    return [
        {
            "id": str(room.id),
            "name": room.name,
            "created_at": room.created_at.isoformat()
        }
        for room in rooms
    ]


@router.post("/", status_code=201)
async def create_room(room_data: RoomCreate, db: AsyncSession = Depends(get_db)):
    room = ChatRoom(name=room_data.user_id)
    db.add(room)
    await db.commit()
    await db.refresh(room)
    
    result = await db.execute(select(ChatRoom))
    all_rooms = result.scalars().all()
    
    rooms_data = [
        {
            "id": str(r.id),
            "name": r.name,
            "created_at": r.created_at.isoformat()
        }
        for r in all_rooms
    ]
    
    await manager.broadcast({
        "type": "rooms_updated",
        "data": rooms_data
    })
    
    return {
        "id": str(room.id),
        "name": room.name,
        "created_at": room.created_at.isoformat()
    }