import { useState } from "react";
import { PlusCircle } from "lucide-react";

function ExpenseForm({ addExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Khác");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return alert("Vui lòng nhập đủ thông tin!");

    addExpense({
      name,
      amount: Number(amount),
      type,
      date,
      category
    });

    setName("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="glass-panel form-section">
      <h3 className="section-title">Thêm giao dịch mới</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
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
        </div>
        <div className="form-grid">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Chi tiêu (-)</option>
            <option value="income">Thu nhập (+)</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Ăn uống</option>
            <option>Di chuyển</option>
            <option>Mua sắm</option>
            <option>Hóa đơn</option>
            <option>Giải trí</option>
            <option>Khác</option>
          </select>
        </div>
        <div style={{ marginTop: "16px" }}>
          <button className="btn-primary" type="submit" style={{ width: "100%" }}>
            <PlusCircle size={20} /> Thêm Giao Dịch
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;