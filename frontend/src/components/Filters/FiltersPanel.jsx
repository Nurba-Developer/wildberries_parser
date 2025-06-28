import React from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import PriceSlider from "./PriceSlider";
import RatingFilter from "./RatingFilter";
import ReviewCountFilter from "./ReviewCountFilter";

const FiltersPanel = ({ filters, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">🔍 Фильтры</h2>

      <div className="flex flex-wrap gap-6 items-end">

        {/* Цена */}
        <div className="min-w-[220px]">
          <PriceSlider
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onChange={(min, max) => {
              onChange("minPrice", min);
              onChange("maxPrice", max);
            }}
          />
        </div>

        {/* Рейтинг */}
        <div className="min-w-[180px]">
          <RatingFilter
            minRating={filters.minRating}
            onChange={(val) => onChange("minRating", val)}
          />
        </div>

        {/* Отзывы */}
        <div className="min-w-[200px]">
          <ReviewCountFilter
            minReviews={filters.minReviews}
            onChange={(val) => onChange("minReviews", val)}
          />
        </div>

        {/* Сортировка */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Сортировать по</label>
          <select
            value={filters.sortBy || "price"}
            onChange={(e) => onChange("sortBy", e.target.value)}
            className="px-3 py-2 rounded-md border text-sm shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="price">Цене</option>
            <option value="sale_price">Цене со скидкой</option>
            <option value="rating">Рейтингу</option>
            <option value="feedbacks">Кол-ву отзывов</option>
            <option value="name">Названию</option>
          </select>
        </div>

        {/* Порядок */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Порядок</label>
          <select
            value={filters.sortOrder || "asc"}
            onChange={(e) => onChange("sortOrder", e.target.value)}
            className="px-3 py-2 rounded-md border text-sm shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">По возрастанию ▲</option>
            <option value="desc">По убыванию ▼</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
