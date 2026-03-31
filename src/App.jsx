import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import ExpenseChart from "./components/ExpenseChart";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load từ localStorage
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

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (item) => {
    setExpenses([...expenses, item]);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  //  Filter
  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((item) => item.type === filter);

  return (
    <div className="app-container">
      <h1>💰 Quản lý chi tiêu</h1>

      <div className="dashboard-grid">
        <Summary expenses={filteredExpenses} />
        <ExpenseChart expenses={filteredExpenses} />
      </div>

      <div className="form-section">
        <label>Bộ lọc: </label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="income">Chỉ khoản Thu</option>
          <option value="expense">Chỉ khoản Chi</option>
        </select>
      </div>

      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={filteredExpenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;
