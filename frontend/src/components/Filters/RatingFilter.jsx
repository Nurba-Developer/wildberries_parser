import React from "react";
import { FaStar } from "react-icons/fa";

const RatingFilter = ({ minRating, onChange }) => {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Минимальный рейтинг</label>
      <div className="relative">
        <select
          value={minRating}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 pr-10 shadow-sm text-sm appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[0, 1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val}+
            </option>
          ))}
        </select>
        <FaStar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default RatingFilter;
