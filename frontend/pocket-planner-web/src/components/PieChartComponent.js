import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChartComponent({ expenses, darkMode }) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(expense.amount);
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#14B8A6",
          "#EC4899",
          "#6366F1",
          "#F97316",
        ],
      },
    ],
  };
if (expenses.length === 0) {
  return (
    <div
      style={{
    width: "100%",
    maxWidth: "450px",
    margin: "auto",
    background: darkMode ? "#1F2937" : "#FFFFFF",
    padding: "15px",
    borderRadius: "15px",
  }}
    >
      No expense data available.
    </div>
  );
}
  return (
   <div
  style={{
    width: "350px",
    margin: "auto",
    background: darkMode ? "#1F2937" : "#FFFFFF",
    padding: "15px",
    borderRadius: "15px",
  }}
>
      <Pie
  data={data}
  options={{
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#FFFFFF" : "#111827",
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
        titleColor: darkMode ? "#FFFFFF" : "#111827",
        bodyColor: darkMode ? "#FFFFFF" : "#111827",
        borderColor: darkMode ? "#4B5563" : "#E5E7EB",
        borderWidth: 1,
      },
    },
  }}
/>
    </div>
  );
}

export default PieChartComponent;