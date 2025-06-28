from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from sqlalchemy import nullsfirst, nullslast

from backend.app import models, schemas

def get_product(db: Session, product_id: int) -> Optional[models.Product]:
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100) -> List[models.Product]:
    return db.query(models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate) -> models.Product:
    db_product = models.Product(
        name=product.name,
        price=product.price,
        sale_price=product.sale_price,
        rating=product.rating,
        feedbacks=product.feedbacks,
        brand_id=product.brand_id,
        category_id=product.category_id,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def filter_and_sort_products(
    db: Session,
    min_price: float = 0,
    max_price: float = 100000,
    min_rating: float = 0,
    min_reviews: int = 0,
    sort_by: str = "price",
    sort_order: str = "asc",
    brand_id: Optional[int] = None,
    category_id: Optional[int] = None,
    limit: int = 200,
) -> List[models.Product]:
    query = db.query(models.Product).options(
        joinedload(models.Product.brand),
        joinedload(models.Product.category)
    ).filter(
        models.Product.price >= min_price,
        models.Product.price <= max_price,
        (models.Product.rating >= min_rating) | (models.Product.rating == None),
        (models.Product.feedbacks >= min_reviews) | (models.Product.feedbacks == None),
    )

    if brand_id is not None:
        query = query.filter(models.Product.brand_id == brand_id)
    if category_id is not None:
        query = query.filter(models.Product.category_id == category_id)

    sort_fields = {
        "price": models.Product.price,
        "sale_price": models.Product.sale_price,
        "rating": models.Product.rating,
        "feedbacks": models.Product.feedbacks,
        "name": models.Product.name,
    }

    sort_column = sort_fields.get(sort_by, models.Product.price)

    if sort_order == "desc":
        query = query.order_by(nullslast(sort_column.desc()))
    else:
        query = query.order_by(nullsfirst(sort_column.asc()))

    return query.limit(limit).all()
