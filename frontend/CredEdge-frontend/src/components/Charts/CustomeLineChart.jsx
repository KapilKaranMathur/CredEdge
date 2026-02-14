import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomeLineChart = ({ data, color = "emerald" }) => {
  const colorMap = {
    emerald: {
      stroke: "#10b981",
      gradStart: "#10b981",
      gradMid: "#34d399",
      gradEnd: "#6ee7b7",
      dot: "#10b981",
      label: "text-emerald-600 dark:text-emerald-400",
    },
    sage: {
      stroke: "#8fc0a9",
      gradStart: "#8fc0a9",
      gradMid: "#a8d5ba",
      gradEnd: "#c6eadd",
      dot: "#8fc0a9",
      label: "text-[#6d9e87] dark:text-[#8fc0a9]",
    },
  };
  const c = colorMap[color] || colorMap.emerald;

  const CutomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-sm shadow-xl rounded-xl px-4 py-3 border border-gray-100 dark:border-[#2a2a2a]">
          <p className={`text-xs font-semibold ${c.label} mb-1`}>
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Amount:{" "}
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              ${payload[0].payload.amount?.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-transparent">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id={`lineGrad-${color}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={c.gradStart} stopOpacity={0.3} />
              <stop offset="50%" stopColor={c.gradMid} stopOpacity={0.1} />
              <stop offset="100%" stopColor={c.gradEnd} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:opacity-10"
          />
          <XAxis
            dataKey="month"
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
          <Tooltip content={<CutomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={c.stroke}
            fill={`url(#lineGrad-${color})`}
            strokeWidth={2.5}
            dot={{ r: 4, fill: c.dot, stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: c.dot, stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomeLineChart;
