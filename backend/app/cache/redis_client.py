from redis.asyncio import Redis
from app.config import settings

redis_client: Redis | None = None

async def init_redis():
  global redis_client
  redis_client = Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWORD,
  )

  try:
    await redis_client.ping()
  except Exception as e:
    print(f"Redis 연결 실패: {e}")
    raise

async def close_redis():
  global redis_client
  if redis_client:
    await redis_client.close()
    redis_client = None

async def get_redis():
  if not redis_client:
    raise Exception("Redis 연결이 없습니다.")
  return redis_client

  