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

function PieChartComponent({ expenses }) {
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

  return (
    <div style={{ width: "350px", margin: "auto" }}>
      <Pie data={data} />
    </div>
  );
}

export default PieChartComponent;