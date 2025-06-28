import React from "react";
import { FaCommentDots } from "react-icons/fa";

const ReviewCountFilter = ({ minReviews, onChange }) => {
  const handleChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Минимум отзывов</label>
      <div className="relative">
        <input
          type="number"
          value={minReviews}
          min={0}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 pr-10 shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
        />
        <FaCommentDots className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default ReviewCountFilter;
