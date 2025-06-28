from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.app import crud, schemas
from backend.app.database import get_db

router = APIRouter(
    prefix="/brands",
    tags=["brands"]
)

@router.post("/", response_model=schemas.BrandOut)
def create_brand(brand: schemas.BrandCreate, db: Session = Depends(get_db)):
    return crud.create_brand(db, brand)

@router.get("/", response_model=List[schemas.BrandOut])
def read_brands(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_brands(db, skip=skip, limit=limit)

@router.get("/{brand_id}", response_model=schemas.BrandOut)
def read_brand(brand_id: int, db: Session = Depends(get_db)):
    db_brand = crud.get_brand(db, brand_id)
    if db_brand is None:
        raise HTTPException(status_code=404, detail="Brand not found")
    return db_brand
