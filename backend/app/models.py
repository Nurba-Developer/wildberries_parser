from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    sale_price = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True)
    feedbacks = Column(Integer, nullable=True)  # количество отзывов
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=False)
    promo_text = Column(String, nullable=True)
    url = Column(String, nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)

    # Отношения
    brand = relationship("Brand", back_populates="products")
    category = relationship("Category", back_populates="products")


class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    # Обратная связь
    products = relationship("Product", back_populates="brand")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    products = relationship("Product", back_populates="category")
