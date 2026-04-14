import { useMemo } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

function Summary({ expenses }) {
  const { income, expense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    expenses.forEach((item) => {
      if (item.type === "income") income += item.amount;
      else expense += item.amount;
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [expenses]);

  return (
    <div className="glass-panel summary-container">
      <h3 className="section-title">Tổng quan</h3>
      
      <div className="summary-card balance">
        <div className="summary-label">
          <Wallet size={16} /> Số dư hiện tại
        </div>
        <h4 className="summary-value">{balance.toLocaleString()} VND</h4>
      </div>

      <div className="summary-card income">
        <div className="summary-label">
          <TrendingUp size={16} color="#10b981" /> Tổng thu
        </div>
        <h4 className="summary-value" style={{color: '#10b981'}}>{income.toLocaleString()} VND</h4>
      </div>

      <div className="summary-card expense">
        <div className="summary-label">
           <TrendingDown size={16} color="#ef4444" /> Tổng chi
        </div>
        <h4 className="summary-value" style={{color: '#ef4444'}}>{expense.toLocaleString()} VND</h4>
      </div>
    </div>
  );
}

export default Summary;