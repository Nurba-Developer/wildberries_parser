import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";

const DiscountRatingLineChart = ({ products }) => {
  // Подготовка данных: фильтрация, расчет процента скидки, сортировка по рейтингу
  const data = products
    .filter(
      (p) =>
        p.price != null &&
        p.discount_price != null &&
        p.rating != null
    )
    .map((p) => ({
      rating: +p.rating.toFixed(1),
      discountPercent: ((p.price - p.discount_price) / p.price) * 100,
    }))
    .sort((a, b) => a.rating - b.rating);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-3xl shadow-lg ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
        📉 Скидка (%) в зависимости от рейтинга
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="rating"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickCount={6}
            tick={{ fill: "#4b5563", fontWeight: 600 }}
            stroke="#4b5563"
            label={
              <Label
                value="Рейтинг"
                position="insideBottom"
                offset={-30}
                style={{ fill: "#4b5563", fontWeight: 700 }}
              />
            }
            allowDecimals={true}
          />
          <YAxis
            tick={{ fill: "#4b5563", fontWeight: 600 }}
            stroke="#4b5563"
            label={
              <Label
                value="Скидка (%)"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle", fill: "#4b5563", fontWeight: 700 }}
              />
            }
            domain={[0, 'dataMax + 10']}
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, backgroundColor: "#f9fafb", borderColor: "#34d399" }}
            formatter={(value) => `${value.toFixed(2)}%`}
          />
          <Line
            type="monotone"
            dataKey="discountPercent"
            stroke="#34d399"
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2, fill: "#10b981" }}
            activeDot={{ r: 7 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiscountRatingLineChart;
