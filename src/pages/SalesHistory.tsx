/* eslint-disable @typescript-eslint/no-explicit-any */

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useGetSalesHistoryQuery } from "../redux/features/sales/saleApi";
import { useState } from "react";

function SalesHistory() {
  const { data, isLoading, isError } = useGetSalesHistoryQuery(undefined);
  const [selectedOption, setSelectedOption] = useState("daily");

  console.log({ isError });
  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const generateChartData = (data: any[], label: string) => {
    return {
      labels: data.map((entry) => `${label} ${entry._id}`),
      datasets: [
        {
          label: `${label} total Sales`,
          data: data.map((entry) => entry.totalSales),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold my-4 py-2 bg-green-200">
        Sales History
      </h2>
      <div className="flex justify-end">
        <select
          className="select select-success w-full select-sm max-w-xs"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="chart-container">
        <h2 className="text-center text-2xl font-bold my-4 py-2 bg-orange-200">
          {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}{" "}
          Sales
        </h2>
        <Bar
          data={generateChartData(
            data?.data[selectedOption],
            selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)
          )}
        />
        <label className="-mt-5 text-gray-500">
          {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} pre{" "}
          {selectedOption === "weekly"
            ? "Year"
            : selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
        </label>
      </div>
    </div>
  );
}

export default SalesHistory;
