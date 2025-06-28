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

const DiscountHistogram = ({ products }) => {
  // Создаем 10 корзин для диапазонов скидок 0-10%, 10-20%, ..., 90-100%
  const data = Array.from({ length: 10 }, (_, i) => ({
    range: `${i * 10}-${i * 10 + 10}%`,
    count: 0,
  }));

  products.forEach((product) => {
    if (product.price && product.discount_price) {
      const discountPercent = ((product.price - product.discount_price) / product.price) * 100;
      const bucket = Math.min(Math.floor(discountPercent / 10), 9);
      data[bucket].count += 1;
    }
  });

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold text-orange-600 mb-3 text-center">🎁 Распределение скидок</h2>
      <p className="text-gray-600 mb-6 text-center">
        Анализ количества товаров в разных диапазонах скидок от 0% до 100%.
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 14, fill: "#6b7280" }}
            stroke="#6b7280"
            interval={0}
          >
            <Label
              value="Диапазон скидок (%)"
              offset={20}
              position="bottom"
              style={{ fill: "#6b7280", fontWeight: '600' }}
            />
          </XAxis>
          <YAxis
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontWeight: '600' }}
          >
            <Label
              value="Количество товаров"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle", fill: "#6b7280", fontWeight: '600' }}
            />
          </YAxis>
          <Tooltip
            cursor={{ fill: 'rgba(255, 127, 80, 0.1)' }}
            contentStyle={{ borderRadius: 12, backgroundColor: "#fff", borderColor: "#ff7f50" }}
            formatter={(value) => [`${value} товаров`, "Количество"]}
          />
          <Bar
            dataKey="count"
            fill="#ff7f50"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiscountHistogram;
