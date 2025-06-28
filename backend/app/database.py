from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import asynccontextmanager
from typing import AsyncGenerator

# 🔹 URLs
DATABASE_URL_SYNC = "postgresql://postgres:12345@localhost/wildberries_db"
DATABASE_URL_ASYNC = "postgresql+asyncpg://postgres:12345@localhost/wildberries_db"

# 🔹 Sync engine (для FastAPI Depends)
sync_engine = create_engine(DATABASE_URL_SYNC)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)

# 🔹 Async engine (если нужен в будущем)
async_engine = create_async_engine(DATABASE_URL_ASYNC, echo=False)
async_session_maker = async_sessionmaker(
    bind=async_engine, class_=AsyncSession, expire_on_commit=False
)

# 🔹 Base model
Base = declarative_base()

engine = sync_engine

# 🔹 Dependency для sync FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 Dependency для async FastAPI (на будущее)
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

