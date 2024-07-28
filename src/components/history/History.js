import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function History(props) {
  const offset = useRef(0);
  const [expenseHistory, setExpenseHistory] = useState([]);

  const fetchRecentExpenses = async () => {
    if (props.session && props.session.user.aud === "authenticated") {
      const config = {
        headers: {
          Authorization: `Bearer ${props.session.access_token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:3030/getRecentExpense?offset=${offset.current}`,
        config
      );
      console.log(response);
      return response.data;
    }
  };

  useEffect(() => {
    const recentExpenses = fetchRecentExpenses();
  }, []);
  return <div></div>;
}
