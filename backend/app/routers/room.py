from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from pydantic import BaseModel

from app.db import get_db
from app.db.models import ChatRoom

router = APIRouter(prefix="/rooms", tags=["rooms"])


class RoomCreate(BaseModel):
    name: str


@router.get("/")
async def get_rooms(db: AsyncSession = Depends(get_db)):
    """채팅방 목록 조회"""
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
async def create_room(data: RoomCreate, db: AsyncSession = Depends(get_db)):
    """채팅방 생성"""
    room = ChatRoom(name=data.name)
    db.add(room)
    await db.commit()
    await db.refresh(room)
    
    return {
        "id": str(room.id),
        "name": room.name,
        "created_at": room.created_at.isoformat()
    }