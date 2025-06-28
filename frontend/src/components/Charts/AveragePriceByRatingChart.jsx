import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

const AveragePriceByRatingChart = ({ products }) => {
  const ratingGroups = {};

  products.forEach((product) => {
    if (product.rating != null && product.price != null) {
      const rating = Math.floor(product.rating);
      if (!ratingGroups[rating]) {
        ratingGroups[rating] = { total: 0, count: 0 };
      }
      ratingGroups[rating].total += product.price;
      ratingGroups[rating].count += 1;
    }
  });

  const data = Object.entries(ratingGroups)
    .map(([rating, group]) => ({
      rating: Number(rating),
      avgPrice: group.total / group.count,
    }))
    .sort((a, b) => a.rating - b.rating);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">📈 Средняя цена по рейтингу</h2>
      <p className="text-gray-600 text-center mb-6">
        Этот график показывает, как средняя цена товаров меняется в зависимости от их рейтинга.
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis dataKey="rating" tick={{ fontSize: 14 }} stroke="#6b7280">
            <Label value="Рейтинг товара" offset={20} position="bottom" />
          </XAxis>
          <YAxis stroke="#6b7280" tickFormatter={(value) => `${value.toFixed(0)} ₽`}>
            <Label
              value="Средняя цена"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle', fill: '#6b7280' }}
            />
          </YAxis>
          <Tooltip
            formatter={(value) => [`${value.toFixed(2)} ₽`, "Средняя цена"]}
            labelFormatter={(label) => `Рейтинг: ${label}`}
            contentStyle={{ borderRadius: 12, backgroundColor: "#f9fafb", borderColor: "#d1d5db" }}
          />
          <Bar dataKey="avgPrice" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AveragePriceByRatingChart;
