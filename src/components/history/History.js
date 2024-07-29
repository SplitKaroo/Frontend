import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "../history/History.css";

export default function History(props) {
  const offset = useRef(0);
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecentExpenses = useCallback(async () => {
    if (props.session && props.session.user.aud === "authenticated") {
      const config = {
        headers: {
          Authorization: `Bearer ${props.session.access_token}`,
        },
      };
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3030/getRecentExpense?offset=${offset.current}`,
          config
        );
        offset.current += 5;
        setExpenseHistory((prev) => [...prev, ...response.data]);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [props.session]);

  useEffect(() => {
    fetchRecentExpenses();
  }, [fetchRecentExpenses]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchRecentExpenses();
        }
      },
      {
        root: document.querySelector(".history-container"),
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [fetchRecentExpenses, loading]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isOwed = (expense) => {
    return (
      expense.amountOwingToUser > 0 &&
      expense.owingUsers.some((user) => user.owingUser === props.currentUser)
    );
  };

  const isOwing = (expense) => {
    return expense.amountOwedByUser > 0;
  };

  return (
    <div className="history-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>User Name</th>
            <th>Amount</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {expenseHistory.map((expense, index) => (
            <React.Fragment key={index}>
              <tr
                className={
                  isOwed(expense)
                    ? "owed-row"
                    : isOwing(expense)
                    ? "owing-row"
                    : ""
                }
                onClick={() =>
                  expense.paidByUser === props.currentUser &&
                  toggleExpand(index)
                }
              >
                <td>{expense.expenseName}</td>
                <td>
                  {expense.paidByUser === props.currentUser
                    ? props.currentUser
                    : expense.paidByUser}
                </td>
                <td>{expense.totalAmount}</td>
                <td>{expense.relatedGroup || "N/A"}</td>
              </tr>
              {expandedIndex === index && (
                <tr className="dropdown">
                  <td colSpan="4">
                    <ul>
                      {expense.owingUsers.map((user, i) => (
                        <li key={i}>
                          {user.owingUser}: {user.amountOwedByUser}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div id="scroll-sentinel"></div>
    </div>
  );
}
