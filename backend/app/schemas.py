from pydantic import BaseModel
from typing import Optional


class BrandBase(BaseModel):
    name: str


class BrandCreate(BrandBase):
    pass


class BrandOut(BrandBase):
    id: int

    class Config:
        orm_mode = True


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: int

    class Config:
        orm_mode = True


class ProductBase(BaseModel):
    name: str
    price: float
    sale_price: Optional[float] = None
    rating: Optional[float] = None
    feedbacks: Optional[int] = None
    brand_id: Optional[int] = None
    category_id: Optional[int] = None


class ProductCreate(ProductBase):
    pass


class ProductOut(ProductBase):
    id: int
    brand: Optional[BrandOut] = None
    category: Optional[CategoryOut] = None

    class Config:
        orm_mode = True
