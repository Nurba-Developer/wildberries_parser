import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const PriceHistogram = ({ products }) => {
  // Группируем товары по ценовым диапазонам с шагом 1000
  const bins = {};
  products.forEach((p) => {
    if (p.price != null) {
      const bin = Math.floor(p.price / 1000);
      bins[bin] = (bins[bin] || 0) + 1;
    }
  });

  // Преобразуем объект в массив для графика с упрощёнными метками
  const data = Object.entries(bins)
    .sort((a, b) => a[0] - b[0])
    .map(([bin, count]) => ({
      priceRange: `Диапазон ${+bin + 1}`,
      count,
    }));

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold mb-5 text-center text-indigo-700">
        💰 Распределение товаров по ценовым диапазонам
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 60 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e7ff" />
          <XAxis
            dataKey="priceRange"
            tick={{ fill: "#4f46e5", fontWeight: 600, fontSize: 12 }}
            stroke="#4f46e5"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={70}
            label={
              <Label
                value="Ценовые диапазоны"
                position="insideBottom"
                offset={-50}
                style={{ fill: "#4338ca", fontWeight: 700, fontSize: 14 }}
              />
            }
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#4f46e5", fontWeight: 600, fontSize: 12 }}
            stroke="#4f46e5"
            label={{
              value: "Количество товаров",
              angle: -90,
              position: "insideLeft",
              fill: "#4338ca",
              fontWeight: 700,
              fontSize: 14,
              textAnchor: "middle",
            }}
          />
          <Tooltip
            cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
            contentStyle={{
              borderRadius: "12px",
              backgroundColor: "#eef2ff",
              borderColor: "#4f46e5",
              fontWeight: 600,
              color: "#312e81",
            }}
            formatter={(value) => [`${value} товаров`, "Количество"]}
          />
          <Bar
            dataKey="count"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistogram;
