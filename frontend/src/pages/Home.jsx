import React, { useState } from "react";
import FiltersPanel from "../components/Filters/FiltersPanel";
import ProductsTable from "../components/ProductsTable";
import PriceHistogram from "../components/Charts/PriceHistogram";
import DiscountRatingLineChart from "../components/Charts/DiscountRatingLineChart";
import ReviewsRatingScatterChart from "../components/Charts/ReviewsRatingScatterChart";
import AveragePriceByRatingChart from "../components/Charts/AveragePriceByRatingChart";
import DiscountHistogram from "../components/Charts/DiscountHistogram";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    minRating: 0,
    minReviews: 0,
  });

  const [sort, setSort] = useState({ by: "price", order: "asc" });
  const { products, loading } = useProducts(filters, sort);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-white to-[#f5f3ff] px-6 py-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Заголовок */}
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
            🛒 Wildberries Analytics
          </h1>
          <p className="mt-3 text-gray-600 text-lg max-w-3xl mx-auto">
            Получите понимание рынка: анализ цен, рейтингов и отзывов товаров с Wildberries.
          </p>
        </header>

        {/* Фильтры */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-300 hover:shadow-indigo-300 transition-shadow duration-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <span className="text-indigo-600 animate-pulse">🎯</span> Фильтрация данных
          </h2>
          <FiltersPanel filters={filters} onChange={handleFilterChange} />
        </section>

        {/* Контент */}
        {loading ? (
          <div className="flex justify-center items-center py-28">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-400 border-t-transparent rounded-full" />
            <span className="ml-5 text-xl text-indigo-700 font-semibold">Загрузка данных...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600 text-xl font-medium py-20">
          Нет товаров, удовлетворяющих фильтрам
          </div>
        ) : (
          <>
            {/* Таблица товаров */}
            <section className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <span className="text-indigo-600">📋</span> Таблица товаров
              </h2>
              <ProductsTable products={products} sort={sort} setSort={setSort} />
            </section>

            {/* Гистограмма цен */}
            <section className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <span className="text-indigo-600">📊</span> Гистограмма цен
              </h2>
              <PriceHistogram products={products} />
            </section>

            {/* 📈 Скидка (%) в зависимости от рейтинга */}
            <section className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-300">
              <DiscountRatingLineChart products={products} />
            </section>

            {/* 📈 Кол-во отзывов от рейтинга */}
            <section className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-300">
              <ReviewsRatingScatterChart products={products} />
            </section>

            {/* 📈 Средняя цена по рейтингу */}
            <section className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-300">
              <AveragePriceByRatingChart products={products} />
            </section>

            {/* 📈 Гистограмма скидок */}
            <section className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-300">
              <DiscountHistogram products={products} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
