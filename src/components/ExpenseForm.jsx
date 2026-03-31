import { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return alert("Vui lòng nhập đủ thông tin!");

    addExpense({
      name,
      amount: Number(amount),
      type,
      date,
    });

    setName("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="form-section">
      <h3 style={{ marginBottom: "15px", color: "#94a3b8" }}>Thêm giao dịch mới</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <input
          placeholder="Tên khoản (vd: Ăn sáng)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Số tiền"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Chi tiêu (-)</option>
          <option value="income">Thu nhập (+)</option>
        </select>
        <button className="btn-add" type="submit">
          + Thêm
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;