import React, { useEffect, useState } from "react";

function ExpenseUserListItem(props) {
  return (
    <div>
      <li onClick={props.remove}>{props.participant}➖</li>
    </div>
  );
}

function ExpenseParticipantUserSuggestionListItem(props) {
  return (
    <div>
      <li
        onClick={() =>
          props.setUserShareList([
            ...props.userShareList,
            {
              member: props.member,
              share: 0,
            },
          ])
        }
      >
        {props.member} ➕
      </li>
    </div>
  );
}

function SelectExpenseType(props) {
  return (
    <div>
      <label htmlFor="expense-type">Choose expense type</label>
      <select
        name="expense-type"
        onChange={(e) => {
          props.setExpenseType(e.target.value);
        }}
      >
        {props.expenseType.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default function Expense(props) {
  const expenseTypeList = ["EQUAL", "PERCENT", "EXACT"];

  const [isPayedByYou, setIsPayedByYou] = useState(true);
  const [expenseParticipant, setExpenseParticipant] = useState("");
  const [userShareList, setUserShareList] = useState([]);
  const [expenseType, setExpenseType] = useState(expenseTypeList[0]);
  const [totalAmount, setTotalAmount] = useState(0);

  const removeExpenseParticipant = (toBeRemoved) => {
    let editedList = userShareList.filter(
      (userShare) => userShare.member != toBeRemoved
    );
    setUserShareList([...editedList]);
  };

  const equallExpense = () => {};
  const percentExpense = () => {};
  const exactExpense = () => {};
  const updateUserShares = () => {
    switch (expenseType) {
      case "EQUAL":
        equallExpense();
      case "PERCENT":
        percentExpense();
      case "EXACT":
        exactExpense();
    }
  };

  useEffect(() => {
    updateUserShares();
  }, [expenseType]);

  return (
    <div className="expense-container">
      <div className="expense-form">
        <form id="expense-form">
          <input type="text" placeholder="Expense name" />
          <label>
            <input
              type="checkbox"
              checked={isPayedByYou}
              onChange={(e) => setIsPayedByYou(e.target.checked)}
            />
            Did you pay?
          </label>
          <input type="text" placeholder="Payed by?" disabled={isPayedByYou} />
          <input
            type="number"
            placeholder="Total amount"
            onChange={(e) => setTotalAmount(e.target.value)}
          />
          {totalAmount == 0 && <p>Enter total amount to proceed</p>}
          {totalAmount != 0 && (
            <div>
              <SelectExpenseType
                expenseType={expenseTypeList}
                setExpenseType={setExpenseType}
              />
            </div>
          )}

          <br />
          <br />
          {totalAmount != 0 && (
            <input
              type="text"
              placeholder="Expense participant"
              onChange={(e) => setExpenseParticipant(e.target.value)}
            />
          )}

          {totalAmount != 0 && (
            <div>
              <ul>
                {props.memberList
                  .filter(
                    (member) =>
                      member.includes(expenseParticipant) &&
                      ///handle this situation because userShareList is a dictionary
                      !userShareList.some((obj) => obj.member === member)
                  )
                  .map((filteredMember, index) => (
                    <ExpenseParticipantUserSuggestionListItem
                      key={index}
                      member={filteredMember}
                      setUserShareList={setUserShareList}
                      userShareList={userShareList}
                    />
                  ))}
              </ul>
            </div>
          )}

          <br />
          <ul>
            {userShareList.map((participant, index) => {
              return (
                <div>
                  <ExpenseUserListItem
                    index={index}
                    participant={participant.member}
                    key={index}
                    remove={() => removeExpenseParticipant(participant.member)}
                    expenseType={expenseType}
                  />
                  <input disabled={expenseType === "EQUAL"} type="number" />
                </div>
              );
            })}
          </ul>
        </form>
      </div>
    </div>
  );
}
