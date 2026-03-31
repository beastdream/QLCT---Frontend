import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ExpenseChart({ expenses }) {
  const barData = useMemo(() => {
    let monthlyData = {};

    expenses.forEach((item) => {
      if (!item.date) return;

      const date = new Date(item.date);
      if (isNaN(date)) return;

      const month = date.getMonth() + 1;

      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }

      if (item.type === "income") {
        monthlyData[month].income += item.amount;
      } else {
        monthlyData[month].expense += item.amount;
      }
    });
    const labels = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);

  const incomeData = [];
  const expenseData = [];

  for (let i = 1; i <= 12; i++) {
    incomeData.push(monthlyData[i]?.income || 0);
    expenseData.push(monthlyData[i]?.expense || 0);
  }

  return {
    labels,
    datasets: [
          {
        label: "Thu",
        data: incomeData,
        backgroundColor: (context) => {
          const { ctx } = context.chart;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#22c55e");
          gradient.addColorStop(1, "#4ade80");
          return gradient;
        },
        borderRadius: 10,
      },
      {
        label: "Chi",
        data: expenseData,
        backgroundColor: (context) => {
          const { ctx } = context.chart;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#ef4444");
          gradient.addColorStop(1, "#f87171");
          return gradient;
        },
        borderRadius: 10,
      },
    ],
  };
}, [expenses]);

  // options giống app mobile
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#cbd5f5",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#94a3b8",
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="chart-section">
      <h2 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Xu hướng hàng tháng</h2>
      <Bar data={barData} options={options} />
    </div>
  );
}

export default ExpenseChart;
