import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Summary from "../components/Summary";
import ExpenseChart from "../components/ExpenseChart";

function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");

  // ================= LOAD DATA =================
  useEffect(() => {
    try {
      const data = localStorage.getItem("expenses");
      if (data) {
        setExpenses(JSON.parse(data));
      }
    } catch (err) {
      console.error("Lỗi localStorage:", err);
    }
  }, []);

  // ================= SAVE DATA =================
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ================= ADD =================
  const addExpense = (item) => {
    setExpenses((prev) => [...prev, item]);
  };

  // ================= DELETE =================
  const deleteExpense = (index) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= FILTER =================
  const filteredExpenses = expenses.filter((item) => {
    const matchType = filterType === "all" || item.type === filterType;
    const month = new Date(item.date).getMonth() + 1;
    const matchMonth = filterMonth === "all" || month === Number(filterMonth);
    return matchType && matchMonth;
  });

  return (
    <>
      <header>
        <h1>💎 Quản lý chi tiêu</h1>
      </header>

      {/* DASHBOARD */}
      <div className="dashboard-grid">
        <Summary expenses={filteredExpenses} />
        <ExpenseChart expenses={filteredExpenses} />
      </div>

      {/* FILTER */}
      <div className="glass-panel form-section" style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", marginTop: "24px", marginBottom: "24px" }}>
        <h3 className="section-title" style={{ margin: 0 }}>
          <Filter size={20} /> Lọc dữ liệu
        </h3>

        <div className="filter-container" style={{ flex: 1, minWidth: "200px" }}>
          <div className="filter-group" style={{ flex: 1 }}>
            <select onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Tất cả loại khoản</option>
              <option value="income">Thu nhập</option>
              <option value="expense">Chi tiêu</option>
            </select>
          </div>

          <div className="filter-group" style={{ flex: 1 }}>
            <select onChange={(e) => setFilterMonth(e.target.value)}>
              <option value="all">Tất cả các tháng</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FORM */}
      <ExpenseForm addExpense={addExpense} />

      {/* LIST */}
      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
      />
    </>
  );
}

export default HomePage;
