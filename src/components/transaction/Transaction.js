import React, { useEffect, useState } from "react";
import Expense from "../expense/Expense";
import History from "../history/History";
import axios from "axios";

export default function Transaction() {
  const [activeComponent, setActiveComponent] = useState("Expense");
  const [session, setSession] = useState(null);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    setSession(JSON.parse(localStorage.getItem("supabase_session")));
  }, []);
  useEffect(() => {
    if (
      session != null &&
      session.user != null &&
      session.user.aud != null &&
      session.user.aud == "authenticated"
    ) {
      const config = {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      };
      axios
        .get("http://localhost:3030/getAllFriend", config)
        .then((response) => {
          setFriendList(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [session]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Expense":
        return <Expense groupName="" groupCreator="" memberList={friendList} />;
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
