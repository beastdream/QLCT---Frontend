function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="list-section">
      <h3 style={{ marginBottom: "15px", color: "#94a3b8" }}>Lịch sử giao dịch</h3>
      {expenses.length === 0 ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>Chưa có giao dịch nào.</p>
      ) : (
        <ul>
          {expenses.map((item, index) => (
            <li key={index} style={{ padding: "12px 0" }}>
              <div>
                <strong style={{ fontSize: "1.1rem" }}>{item.name}</strong>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>📅 {item.date}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span className={item.type === "income" ? "income" : "expense"}>
                  {item.type === "income" ? "+" : "-"}{item.amount.toLocaleString()} VND
                </span>
                <button 
                  onClick={() => deleteExpense(index)}
                  style={{ backgroundColor: "#ef4444", padding: "5px 10px" }}
                >
                  Xóa
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