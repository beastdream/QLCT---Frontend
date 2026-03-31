import { useState, useEffect } from "react";
// Sửa lại đường dẫn bằng cách thêm "/components/" vào giữa
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import ExpenseChart from "./components/ExpenseChart";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");

  // 🔥 Load từ localStorage
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

  // 🔥 Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (item) => {
    setExpenses([...expenses, item]);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // 🔍 Filter
  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((item) => item.type === filter);

  // return (
  //   <div className="app-container">
  //     <h1>💰 Quản lý chi tiêu</h1>

  //     {/* Summary */}
  //     <div className="summary-section">
  //       <Summary expenses={filteredExpenses} />
  //     </div>

  //     {/* Filter */}
  //     <div className="form-section">
  //       <select onChange={(e) => setFilter(e.target.value)}>
  //         <option value="all">Tất cả</option>
  //         <option value="income">Thu</option>
  //         <option value="expense">Chi</option>
  //       </select>
  //     </div>

  //     {/* Chart */}
  //     <div className="chart-section">
  //       <h2>Biểu đồ theo tháng</h2>
  //       <ExpenseChart expenses={filteredExpenses} />
  //     </div>

  //     {/* Form */}
  //     <div className="form-section">
  //       <ExpenseForm addExpense={addExpense} />
  //     </div>

  //     {/* List */}
  //     <div className="list-section">
  //       <ExpenseList
  //         expenses={filteredExpenses}
  //         deleteExpense={deleteExpense}
  //       />
  //     </div>
  //   </div>
  // );
  // Trong phần return của App.jsx, bạn bỏ các div bọc ngoài không cần thiết
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