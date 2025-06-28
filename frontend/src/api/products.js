import axios from "axios";

const API_URL = "http://127.0.0.1:8000/products";

export const fetchProducts = async (filters = {}, sort = {}) => {
  const params = {
    min_price: filters.minPrice ?? 0,
    max_price: filters.maxPrice ?? 100000,
    min_rating: filters.minRating ?? 0,
    min_reviews: filters.minReviews ?? 0,
    sort_by: sort.by ?? "price",
    order: sort.order ?? "asc",
  };

  if (filters.brandId) {
    params.brand_id = filters.brandId;
  }
  if (filters.categoryId) {
    params.category_id = filters.categoryId;
  }

  try {
    const response = await axios.get(`${API_URL}/filter/`, { params });
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
    return [];
  }
};
