import React, { useState } from "react";
import Expense from "../expense/Expense";
import History from "../history/History";

export default function Transaction() {
  const [activeComponent, setActiveComponent] = useState("Expense");
  const renderComponent = () => {
    switch (activeComponent) {
      case "Expense":
        return <Expense />;
      case "History":
        return <History />;
    }
  };
  return (
    <div className="transaction-container">
      <div className="transaction-container-choice">
        <a href="#" onClick={() => setActiveComponent("Expense")}>
          Expense
        </a>
        <a href="#" onClick={() => setActiveComponent("History")}>
          Show History
        </a>
      </div>
      <div className="transaction-container-child">{renderComponent()}</div>
    </div>
  );
}
