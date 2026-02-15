import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const BAR_COLORS = ["#264653",
  "#287271",
  "#2A9D8F",
  "#E9C46A",
  "#EFB366",
  "#F4A261",
  "#EE8959",
  "#E76F51",];

const CustomBarChart = ({ data }) => {
  const labelKey =
    data && data.length > 0 && data[0].month ? "month" : "category";

  return (
    <div className="bg-transparent mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="10%">
          <defs>
            {BAR_COLORS.map((color, i) => (
              <linearGradient
                key={i}
                id={`barGrad${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:opacity-10"
          />
          <XAxis
            dataKey={labelKey}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            stroke="none"
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            stroke="none"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={60}>
            {(data || []).map((entry, index) => (
              <Cell
                key={index}
                fill={`url(#barGrad${index % BAR_COLORS.length})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
