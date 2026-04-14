import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

// Đăng ký chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({ expenses }) {
  // ================= BAR CHART (THEO THÁNG) =================
  const barData = useMemo(() => {
    const monthlyData = {};

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
          backgroundColor: "#10b981",
          borderRadius: 8,
        },
        {
          label: "Chi",
          data: expenseData,
          backgroundColor: "#ef4444",
          borderRadius: 8,
        },
      ],
    };
  }, [expenses]);

  // options giống app mobile
  // ================= PIE CHART (THEO CATEGORY) =================
  const pieData = useMemo(() => {
    const categoryData = {};

    expenses.forEach((item) => {
      if (item.type === "expense") {
        const category = item.category || "Khác";
        categoryData[category] =
          (categoryData[category] || 0) + item.amount;
      }
    });

    return {
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: [
            "#f43f5e",
            "#f97316",
            "#eab308",
            "#22c55e",
            "#0ea5e9",
            "#8b5cf6",
          ],
          borderColor: "#1e293b",
          borderWidth: 2,
        },
      ],
    };
  }, [expenses]);

  // ================= OPTIONS =================
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#475569",
          font: {
            family: "'Outfit', sans-serif"
          }
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#475569",
          font: { family: "'Outfit', sans-serif" }
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#475569",
          font: { family: "'Outfit', sans-serif" },
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          dash: [4, 4]
        }
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#475569",
          font: {
            family: "'Outfit', sans-serif"
          }
        }
      }
    }
  };

  // ================= UI =================
  return (
    <div className="glass-panel chart-section" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* BAR CHART */}
      <div className="chart-wrapper">
        <h3 className="section-title" style={{ fontSize: "1.1rem" }}>
          Xu hướng hàng tháng
        </h3>
        <div style={{ height: "250px", position: "relative", width: "100%" }}>
          <Bar data={barData} options={options} />
        </div>
      </div>

      {/* PIE CHART */}
      <div className="chart-wrapper">
        <h3 className="section-title" style={{ fontSize: "1.1rem" }}>
          Phân bổ chi tiêu
        </h3>
        <div style={{ height: "200px", position: "relative", width: "100%" }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
