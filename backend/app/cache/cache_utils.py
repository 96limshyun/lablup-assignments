import json
from app.config import settings
from app.cache.redis_client import get_redis
from typing import Any, Dict, List

async def get_cached_messages(room_id: str, limit: int = 50) -> List[Dict[str, Any]]:
    try:
        redis = await get_redis()
        key = f"messages:{room_id}"
        cached_messages = await redis.lrange(key, 0, limit - 1)
        if cached_messages:
            return [json.loads(msg) for msg in cached_messages]
        return []
    except Exception as e:
        print(f"Redis 조회 오류: {e}")
        return []

async def set_cached_messages(room_id: str, messages: List[Dict[str, Any]]):
    try:
        redis = await get_redis()
        key = f"messages:{room_id}"
        await redis.lpush(key, *[json.dumps(msg) for msg in messages])
        await redis.ltrim(key, 0, settings.MAX_CACHED_MESSAGES - 1)
        await redis.expire(key, settings.CACHE_EXPIRE_SECONDS)
    except Exception as e:
        print(f"Redis 저장 오류: {e}")