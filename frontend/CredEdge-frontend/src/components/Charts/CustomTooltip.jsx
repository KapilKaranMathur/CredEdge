import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-[#0C0C0C]/95 backdrop-blur-sm shadow-xl rounded-xl px-4 py-3 border border-gray-100 dark:border-[#2a2a2a]">
        <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
          {payload[0].name}
        </p>
        <p className="text-base font-bold text-gray-900 dark:text-white">
          ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
