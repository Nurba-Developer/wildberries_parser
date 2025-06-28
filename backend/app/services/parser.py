import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app import models
from backend.app.schemas import ProductCreate
from backend.app.database import get_async_session

WB_API_URL = "https://search.wb.ru/exactmatch/ru/common/v4/search"

async def fetch_and_save_products(query: str, session: AsyncSession, page: int = 1):
    params = {
        "query": query,
        "resultset": "catalog",
        "page": page
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(WB_API_URL, params=params)
        response.raise_for_status()
        data = response.json()

    try:
        products = data["data"]["products"]
    except KeyError:
        return []

    saved_products = []

    for item in products:
        product = models.Product(
            id=item["id"],
            name=item.get("name", ""),
            brand=item.get("brand", ""),
            price=item.get("priceU", 0) // 100,
            sale_price=item.get("salePriceU", 0) // 100,
            rating=item.get("reviewRating", 0.0),
            feedbacks=item.get("feedbacks", 0),
            url=f"https://www.wildberries.ru/catalog/{item['id']}/detail.aspx"
        )

        session.add(product)
        saved_products.append(product)

    await session.commit()
    return saved_products
