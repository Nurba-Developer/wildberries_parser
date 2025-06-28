from backend.app import crud, schemas
from backend.app.database import SessionLocal

def save_products_to_db(products):
    db = SessionLocal()
    try:
        for p in products:
            # Здесь нужно обработать brand и category,
            # получить или создать их, и получить их id
            # Например (псевдокод):
            brand = crud.get_brand_by_name(db, p['brand'])
            if not brand:
                brand = crud.create_brand(db, schemas.BrandCreate(name=p['brand']))

            category = crud.get_category_by_name(db, p['category'])
            if not category:
                category = crud.create_category(db, schemas.CategoryCreate(name=p['category']))

            product_data = schemas.ProductCreate(
                name=p['name'],
                price=p['price'],
                brand_id=brand.id,
                category_id=category.id
            )
            crud.create_product(db, product_data)
        db.commit()
    except Exception as e:
        db.rollback()
        print("Ошибка при сохранении:", e)
    finally:
        db.close()
