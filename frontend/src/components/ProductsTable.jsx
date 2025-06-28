import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip"; // Если используешь библиотеку react-tooltip, установи её

const formatPrice = (price) =>
  price != null ? price.toLocaleString("ru-RU") + " ₽" : "-";

const renderRating = (rating) => {
  if (rating == null) return "-";
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex justify-center items-center space-x-0.5 text-yellow-400 select-none">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={"full" + i} className="drop-shadow-md" />
      ))}
      {halfStar && (
        <FaStar
          style={{ clipPath: "inset(0 50% 0 0)" }}
          className="drop-shadow-md"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={"empty" + i} className="opacity-60" />
      ))}
      <span className="ml-1 text-gray-700 font-semibold select-text">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

const ProductsTable = ({ products }) => {
  return (
    <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-300 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 text-white">
          <tr>
            {[
              { label: "Название", tooltip: "Название товара" },
              { label: "Бренд", tooltip: "Производитель товара" },
              { label: "Цена", tooltip: "Цена без скидки" },
              { label: "Скидка", tooltip: "Цена со скидкой" },
              { label: "Рейтинг", tooltip: "Средний рейтинг пользователей" },
              { label: "Отзывы", tooltip: "Количество отзывов" },
            ].map(({ label, tooltip }) => (
              <th
                key={label}
                scope="col"
                className="px-6 py-3 text-center font-semibold text-sm uppercase tracking-wide cursor-help select-none"
                data-tooltip-id={`tooltip-${label}`}
                data-tooltip-content={tooltip}
              >
                {label}
                <Tooltip
                  id={`tooltip-${label}`}
                  place="top"
                  effect="solid"
                  className="max-w-xs px-2 py-1 rounded-md bg-indigo-900 text-white text-xs"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((p, idx) => (
            <tr
              key={p.id}
              className={`transition-colors duration-300 ${
                idx % 2 === 0 ? "bg-gray-50 hover:bg-indigo-50" : "hover:bg-indigo-50"
              }`}
            >
              <td className="px-6 py-4 whitespace-normal max-w-xs">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-700 hover:text-indigo-900 font-semibold underline break-words"
                  title={p.name}
                >
                  {p.name}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700 font-medium">
                {p.brand?.name ?? "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center font-mono text-green-700 font-semibold">
                {formatPrice(p.price)}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center font-semibold ${
                  p.sale_price ? "text-red-600" : "text-gray-400"
                }`}
              >
                {p.sale_price ? formatPrice(p.sale_price) : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{renderRating(p.rating)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600 font-semibold">
                {p.feedbacks ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
