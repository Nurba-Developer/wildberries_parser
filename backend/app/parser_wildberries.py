import requests
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# --- Настройка SQLAlchemy ---
Base = declarative_base()

class Brand(Base):
    __tablename__ = "brands"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    products = relationship("Product", back_populates="brand")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)  # ID товара из Wildberries
    name = Column(String)
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=False)
    price = Column(Float)
    sale_price = Column(Float)
    rating = Column(Float)
    feedbacks = Column(Integer)
    promo_text = Column(String)
    url = Column(String)

    brand = relationship("Brand", back_populates="products")

# --- Конфигурация подключения к PostgreSQL ---
DB_USER = "postgres"
DB_PASSWORD = "12345"
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "wildberries_db"

DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
Session = sessionmaker(bind=engine)

# Создаем таблицы (если не созданы)
Base.metadata.create_all(engine)

# --- Функция для получения/создания бренда ---
def get_or_create_brand(session, brand_name: str):
    brand = session.query(Brand).filter(Brand.name == brand_name).first()
    if not brand:
        brand = Brand(name=brand_name)
        session.add(brand)
        session.commit()
        session.refresh(brand)
    return brand.id

# --- Функция для получения товаров ---
def fetch_products(query: str, page: int = 1, limit: int = 50, dest: int = 286):
    url = "https://search.wb.ru/exactmatch/ru/common/v4/search"
    params = {
        "query": query,
        "page": page,
        "limit": limit,
        "sort": "popular",
        "resultset": "catalog",
        "dest": dest
    }
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.wildberries.ru/"
    }

    response = requests.get(url, params=params, headers=headers)
    response.raise_for_status()
    data = response.json()
    
    products = data.get("data", {}).get("products", [])
    return products

# --- Функция для сохранения товаров в БД ---
def save_products_to_db(products):
    session = Session()
    # Создаём дефолтный бренд для случаев, когда бренд отсутствует
    unknown_brand_id = get_or_create_brand(session, "Неизвестный бренд")
    
    for p in products:
        brand_name = p.get("brand")
        if brand_name:
            brand_id = get_or_create_brand(session, brand_name)
        else:
            brand_id = unknown_brand_id  # дефолтный бренд
        
        product = Product(
            id=p.get("id"),
            name=p.get("name"),
            brand_id=brand_id,
            price=(p.get("priceU", 0) / 100) if p.get("priceU") else None,
            sale_price=(p.get("salePriceU", 0) / 100) if p.get("salePriceU") else None,
            rating=p.get("rating", 0),
            feedbacks=p.get("feedbacks", 0),
            promo_text=p.get("promoTextCard", ""),
            url=f"https://www.wildberries.ru/catalog/{p.get('id')}/detail.aspx"
        )
        
        existing = session.get(Product, product.id)
        if existing:
            session.merge(product)
        else:
            session.add(product)
    session.commit()
    session.close()

# --- Основной блок ---
if __name__ == "__main__":
    query = "ноутбук"
    products = fetch_products(query=query, dest=286)
    print(f"Найдено товаров: {len(products)}")
    if products:
        save_products_to_db(products)
        print("Товары успешно сохранены в PostgreSQL")
    else:
        print("Товары не найдены.")
