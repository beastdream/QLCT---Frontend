import { Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="glass-panel list-section">
      <h3 className="section-title">Lịch sử giao dịch</h3>
      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>Chưa có giao dịch nào.</p>
        </div>
      ) : (
        <ul className="expense-list">
          {expenses.map((item, index) => (
            <li key={index} className="expense-item">
              <div className="item-info">
                <div className={`item-icon ${item.type}`}>
                  {item.type === "income" ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <span>📅 {item.date} • {item.category || "Khác"}</span>
                </div>
              </div>
              <div className="item-actions">
                <span className={`amount ${item.type}`}>
                  {item.type === "income" ? "+" : "-"}{item.amount.toLocaleString()} VND
                </span>
                <button 
                  className="btn-danger"
                  onClick={() => deleteExpense(index)}
                >
                  <Trash2 size={16} /> Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;