from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.app import crud, schemas
from backend.app.database import get_db

router = APIRouter()

@router.get("/filter/", response_model=List[schemas.ProductOut])
def filter_products(
    min_price: float = Query(0, alias="minPrice"),
    max_price: float = Query(100000, alias="maxPrice"),
    min_rating: float = Query(0, alias="minRating"),
    min_reviews: int = Query(0, alias="minReviews"),
    sort_by: str = Query("price", alias="sort_by"),
    sort_order: str = Query("asc", alias="sort_order"),
    db: Session = Depends(get_db),
):
    try:
        products = crud.filter_and_sort_products(
            db=db,
            min_price=min_price,
            max_price=max_price,
            min_rating=min_rating,
            min_reviews=min_reviews,
            sort_by=sort_by,
            sort_order=sort_order
        )
        return products
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка при фильтрации продуктов: {e}")
