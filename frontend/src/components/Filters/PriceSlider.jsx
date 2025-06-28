import React, { useState, useEffect } from "react";
import { FaRubleSign } from "react-icons/fa";

const PriceSlider = ({ minPrice, maxPrice, onChange }) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  useEffect(() => {
    setMin(minPrice);
    setMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value <= max) {
      setMin(value);
      onChange(value, max);
    }
  };

  const handleMaxChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value >= min) {
      setMax(value);
      onChange(min, value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">Диапазон цен</label>
      <div className="flex items-center gap-4">
        {/* Минимум */}
        <div className="relative w-[100px]">
          <FaRubleSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="number"
            value={min}
            min={0}
            onChange={handleMinChange}
            className="w-full pl-6 pr-2 py-1.5 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="от"
          />
        </div>

        <span className="text-gray-400 text-sm">—</span>

        {/* Максимум */}
        <div className="relative w-[100px]">
          <FaRubleSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="number"
            value={max}
            min={0}
            onChange={handleMaxChange}
            className="w-full pl-6 pr-2 py-1.5 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="до"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
