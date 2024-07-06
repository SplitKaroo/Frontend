import React from "react";
import "../menu/Menu.css";
export default function Menu(props) {
  return (
    <div className="menu-container">
      <div className="menu">
        <a href="#" onClick={() => props.setActiveComponent("Friends")}>
          Friends
        </a>
        <a href="#" onClick={() => props.setActiveComponent("Groups")}>
          Group
        </a>
        <a href="#" onClick={() => props.setActiveComponent("Transactions")}>
          Transactions
        </a>
      </div>
    </div>
  );
}
