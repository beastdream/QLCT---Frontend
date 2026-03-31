function Summary({ expenses }) {
  let income = 0;
  let expense = 0;

  expenses.forEach((item) => {
    if (item.type === "income") income += item.amount;
    else expense += item.amount;
  });

  return (
    <div>
      <p>Thu: {income}</p>
      <p>Chi: {expense}</p>
      <p>Số dư: {income - expense}</p>
    </div>
  );
}

export default Summary;