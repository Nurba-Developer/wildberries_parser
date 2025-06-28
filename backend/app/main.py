import sys
import os
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from backend.app import models, schemas, crud
from backend.app.database import SessionLocal, engine
from backend.app.routers import products, categories, brands

# Чтобы корректно работали импорты (если нужно)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Создаём таблицы, если их нет
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (фронтенд React по localhost:5173)
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # в продакшене лучше указывать конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(brands.router, prefix="/brands", tags=["Brands"])

# Зависимость для сессии базы данных
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Корень для проверки работы сервера
@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!"}

# Эндпоинты создания и чтения продуктов (если нужны)
@app.post("/products/", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

@app.get("/products/", response_model=list[schemas.ProductOut])
def read_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_products(db, skip=skip, limit=limit)
