import { useEffect, useState } from "react";
import axios from "axios";

export const useProducts = (params) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Отфильтруем пустые или undefined параметры, чтобы не отправлять их на сервер
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
        );

        const response = await axios.get("http://localhost:8000/products/filter/", {
          params: filteredParams,
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return { products, loading };
};
