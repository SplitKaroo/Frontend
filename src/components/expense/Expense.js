import React, { useState } from "react";

export default function Expense(props) {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div className="expense-container">
      <div className="expense-form">
        <form>
          <input type="text" placeholder="Expense name" />
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            Did you pay?
          </label>
          <input type="text" placeholder="Payed by?" disabled={isChecked} />
        </form>
      </div>
    </div>
  );
}
