from sqlalchemy import Column, String, Text, BigInteger, ForeignKey, Index, text
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.orm import relationship
from app.db.database import Base
import uuid
from datetime import datetime


class ChatRoom(Base):
    __tablename__ = "chat_rooms"
    
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
        comment="채팅방 고유 ID"
    )
    name = Column(
        String(255),
        nullable=False,
        comment="채팅방 이름"
    )
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        default=datetime.utcnow,
        server_default=text("CURRENT_TIMESTAMP"),
        comment="생성 시간"
    )

    messages = relationship(
        "Message",
        back_populates="room",
        cascade="all, delete-orphan",
        lazy="selectin"
    )
    
    def __repr__(self):
        return f"<ChatRoom(id={self.id}, name={self.name})>"


class Message(Base):
    __tablename__ = "messages"
    
    id = Column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
        comment="메시지 고유 ID"
    )
    room_id = Column(
        UUID(as_uuid=True),
        ForeignKey("chat_rooms.id", ondelete="CASCADE"),
        nullable=False,
        comment="채팅방 ID"
    )
    user_id = Column(
        String(100),
        nullable=False,
        comment="사용자 ID (익명)"
    )
    content = Column(
        Text,
        nullable=False,
        comment="메시지 내용"
    )
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        default=datetime.utcnow,
        server_default=text("CURRENT_TIMESTAMP"),
        comment="생성 시간"
    )
    
    room = relationship("ChatRoom", back_populates="messages")
    
    __table_args__ = (
        Index(
            "idx_room_created",
            "room_id",
            "created_at",
            postgresql_using="btree"
        ),
    )
    
    def __repr__(self):
        return f"<Message(id={self.id}, room_id={self.room_id}, user_id={self.user_id})>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "room_id": str(self.room_id),
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

