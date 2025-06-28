// frontend/src/components/Charts/ReviewsRatingScatterChart.jsx
import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ReviewsRatingScatterChart = ({ products }) => {
  const data = products
    .filter(p => p.rating != null && p.reviews != null)
    .map(p => ({
      rating: p.rating,
      reviews: p.reviews
    }));

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-center">Связь рейтинга и количества отзывов</h2>
      <ScatterChart width={600} height={300}>
        <CartesianGrid />
        <XAxis type="number" dataKey="rating" name="Рейтинг" />
        <YAxis type="number" dataKey="reviews" name="Отзывы" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Продукты" data={data} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default ReviewsRatingScatterChart;
