from backend.app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_get_products():
    response = client.get("/api/products/filter/?min_price=0&min_rating=0")
    assert response.status_code == 200
