from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from app.cache import get_cached_messages, set_cached_messages

from app.db import get_db
from app.db.models import Message
from app.websocket_manager import manager

router = APIRouter(prefix="/chat_messages", tags=["chat_messages"])


class MessageCreate(BaseModel):
    room_id: str
    user_id: str
    content: str

@router.get("/{room_id}")
async def get_messages(room_id: str, db: AsyncSession = Depends(get_db)):
    cached_messages = await get_cached_messages(room_id)
    if cached_messages:
        return cached_messages
    
    result = await db.execute(select(Message).where(Message.room_id == room_id))
    messages = result.scalars().all()
    await set_cached_messages(room_id, [message.to_dict() for message in messages])
    
    return [
        {
            "id": str(message.id),
            "room_id": str(message.room_id),
            "user_id": message.user_id,
            "content": message.content,
            "created_at": message.created_at.isoformat()
        }
        for message in messages
    ]


@router.post("/", status_code=201)
async def create_message(message_data: MessageCreate, db: AsyncSession = Depends(get_db)):

    message = Message(
        room_id=message_data.room_id, 
        user_id=message_data.user_id, 
        content=message_data.content
    )
    db.add(message)
    await db.commit()
    await db.refresh(message)
    
    await set_cached_messages(message_data.room_id, [message.to_dict()])
    
    message_dict = message.to_dict()
    await manager.broadcast_to_room(message_data.room_id, {
        "type": "new_message",
        "data": message_dict
    })
    
    return message_dict