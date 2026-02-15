import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#264653",
  "#287271",
  "#2A9D8F",
  "#E9C46A",
  "#EFB366",
  "#F4A261",
  "#EE8959",
  "#E76F51",]
const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const limitedData = [...(data || [])]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8);
    const dataArr = limitedData.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
        showGradient={false}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
