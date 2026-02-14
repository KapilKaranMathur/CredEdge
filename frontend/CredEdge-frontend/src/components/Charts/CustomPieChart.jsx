import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
  showGradient = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <defs>
          {showGradient &&
            colors.map((color, i) => (
              <linearGradient
                key={i}
                id={`pieGrad${i}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
              </linearGradient>
            ))}
        </defs>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          paddingAngle={2}
          cornerRadius={4}
          stroke="none"
        >
          {(data || []).map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                showGradient
                  ? `url(#pieGrad${index % colors.length})`
                  : colors[index % colors.length]
              }
            />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-20}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="12px"
              fontWeight="500"
              className="uppercase tracking-wider"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              className="fill-gray-900 dark:fill-white"
              fontSize="26px"
              fontWeight="700"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
