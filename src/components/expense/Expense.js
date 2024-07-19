import React, { useEffect, useRef, useState } from "react";
import { addExpenseUtility } from "./ExpenseUtil";

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
      <li onClick={() => props.addUserInUserShareList(props.member)}>
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

  const [remainingAmountToSubmit, setRemainingAmountToSubmit] = useState(0);
  const [payeeName, setPayeeName] = useState(props.currentUser);
  const [isPayedByYou, setIsPayedByYou] = useState(true);
  const [expenseParticipant, setExpenseParticipant] = useState("");
  const [userShareList, setUserShareList] = useState([
    {
      member: props.currentUser,
      share: 0,
      edited: false,
    },
  ]);
  const [expenseType, setExpenseType] = useState(expenseTypeList[0]);
  const [totalAmount, setTotalAmount] = useState(0);
  const expenseNameRef = useRef("");
  const removeExpenseParticipant = (toBeRemoved) => {
    let editedList = userShareList.filter(
      (userShare) => userShare.member != toBeRemoved
    );
    setUserShareList([...editedList]);
    if (
      toBeRemoved === props.currentUser &&
      !props.memberList.includes(props.currentUser)
    ) {
      props.memberList.push(props.currentUser);
    }
    if (expenseType === "EQUAL") {
      equalExpense(editedList);
    } else if (expenseType === "EXACT") {
      exactExpense(editedList);
    } else {
      percentExpense(editedList);
    }
  };

  const equalExpense = (userShareListForEqualExpense) => {
    if (userShareListForEqualExpense.length == 0) {
      return;
    }
    const totalUserInUserShareList =
      userShareListForEqualExpense.length == 0
        ? 1
        : userShareListForEqualExpense.length;
    const updatedUserShareList =
      userShareListForEqualExpense &&
      userShareListForEqualExpense.length > 0 &&
      userShareListForEqualExpense.map((userShare) => ({
        member: userShare.member,
        share: totalAmount / totalUserInUserShareList,
      }));
    setUserShareList(updatedUserShareList);
  };
  const exactExpense = (userShareListForExactExpense) => {
    if (
      userShareListForExactExpense == null ||
      userShareListForExactExpense.length == 0
    ) {
      return [{}];
    }
    let updatedUserShareList;
    if (userShareListForExactExpense.length == 1) {
      updatedUserShareList = [
        {
          member: userShareListForExactExpense[0].member,
          share: totalAmount,
          edited: false,
        },
      ];
    } else {
      updatedUserShareList = userShareListForExactExpense.map((userShare) => ({
        member: userShare.member,
        share: totalAmount / userShareListForExactExpense.length,
        edited: false,
      }));
    }
    setUserShareList(updatedUserShareList);
  };
  const percentExpense = (userShareListForPercentExpense) => {
    if (
      userShareListForPercentExpense == null ||
      userShareListForPercentExpense.length == 0
    ) {
      return [{}];
    }
    let totalPercent = 100;
    let updatedUserShareList;
    if (userShareListForPercentExpense.length == 1) {
      updatedUserShareList = [
        {
          member: userShareListForPercentExpense[0].member,
          share: totalPercent,
          edited: false,
        },
      ];
    } else {
      updatedUserShareList = userShareListForPercentExpense.map(
        (userShare) => ({
          member: userShare.member,
          share: totalPercent / userShareListForPercentExpense.length,
          edited: false,
        })
      );
    }
    setUserShareList(updatedUserShareList);
  };
  const updateUserShares = () => {
    switch (expenseType) {
      case "EQUAL":
        equalExpense(userShareList);
        break;
      case "PERCENT":
        percentExpense(userShareList);
        break;
      case "EXACT":
        exactExpense(userShareList);
        break;
    }
  };

  const handleShareChange = (event, index) => {
    if (userShareList.length == 1) {
      return;
    }
    let currentTotalAmount = expenseType === "PERCENT" ? 100 : totalAmount;
    let newShare = parseFloat(event.target.value);
    newShare = isNaN(newShare) ? 0 : newShare;
    let remainingAmount = currentTotalAmount - newShare;
    let remainingNonEditedSharesList = userShareList.filter(
      (userShare, i) => userShare.edited == false && i != index
    );
    let updatedUserShareList = userShareList.map((userShare, i) => {
      if (i == index) {
        return { member: userShare.member, share: newShare, edited: true };
      } else if (userShare.edited == false) {
        return {
          member: userShare.member,
          share: remainingAmount / remainingNonEditedSharesList.length,
          edited: false,
        };
      } else {
        return {
          member: userShare.member,
          share: userShare.share,
          edited: userShare.edited,
        };
      }
    });

    let updatedTotalSumOfShares = updatedUserShareList.reduce(
      (sum, userShare) => sum + userShare.share,
      0
    );
    if (updatedTotalSumOfShares != currentTotalAmount) {
      setRemainingAmountToSubmit(currentTotalAmount - updatedTotalSumOfShares);
    } else if (updatedTotalSumOfShares == currentTotalAmount) {
      setRemainingAmountToSubmit(0);
    }
    setUserShareList(updatedUserShareList);
  };

  const handlePayeeNameChange = (event) => {
    setPayeeName(event.target.value);
  };

  const updatePayeeName = (memberName) => {
    setPayeeName(memberName);
  };

  const addUserInUserShareList = (memberName) => {
    let newParticipantList = [
      ...userShareList,
      { member: memberName, share: 0, edited: false },
    ];
    if (expenseType === "EQUAL") {
      equalExpense(newParticipantList);
    }
    if (expenseType === "EXACT") {
      exactExpense(newParticipantList);
    }
    if (expenseType === "PERCENT") {
      percentExpense(newParticipantList);
    }
  };

  useEffect(() => {
    setRemainingAmountToSubmit(0);

    updateUserShares();
  }, [expenseType]);

  useEffect(() => {
    updateUserShares();
  }, [totalAmount]);

  const addExpense = (event) => {
    event.preventDefault();
    addExpenseUtility(
      expenseNameRef.current.value,
      totalAmount,
      expenseType,
      payeeName,
      userShareList,
      props.groupName,
      props.groupCreator,
      props.session
    );
  };

  return (
    <div className="expense-container">
      <div className="expense-form">
        <form id="expense-form" onSubmit={addExpense}>
          <input type="text" placeholder="Expense name" ref={expenseNameRef} />
          <input
            type="number"
            placeholder="Total amount"
            onChange={(e) => {
              setTotalAmount(e.target.value);
              if (e.target.value == 0) {
                setUserShareList([
                  {
                    member: props.currentUser,
                    share: 0,
                    edited: false,
                  },
                ]);
              }
            }}
          />
          {totalAmount == 0 && <p>Enter total amount to proceed</p>}

          {totalAmount != 0 && (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isPayedByYou}
                  onChange={(e) => {
                    setIsPayedByYou(e.target.checked);
                    if (e.target.checked) {
                      setPayeeName(props.currentUser);
                    } else {
                      setPayeeName("");
                    }
                  }}
                />
                Did you pay?
              </label>
              <input
                type="text"
                placeholder={
                  isPayedByYou == true
                    ? `Payed by ${props.currentUser} (me 🤚) `
                    : "Payed by?"
                }
                disabled={isPayedByYou}
                onChange={handlePayeeNameChange}
                value={
                  isPayedByYou == true
                    ? `Payed by ${props.currentUser} (me 🤚) `
                    : payeeName
                }
              />
              {!isPayedByYou &&
                totalAmount != 0 &&
                payeeName.length > 0 &&
                !props.memberList.includes(payeeName) && (
                  <div>
                    <ul>
                      {props.memberList
                        .filter((memberName) => memberName.includes(payeeName))
                        .map((memberName, index) => (
                          <li
                            key={index}
                            onClick={() => updatePayeeName(memberName)}
                          >
                            {memberName}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
            </div>
          )}

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
                      !userShareList.some((obj) => obj.member === member)
                  )
                  .map((filteredMember, index) => (
                    <ExpenseParticipantUserSuggestionListItem
                      key={index}
                      member={filteredMember}
                      addUserInUserShareList={addUserInUserShareList}
                      userShareList={userShareList}
                    />
                  ))}
              </ul>
            </div>
          )}

          <br />
          {totalAmount != 0 && (
            <div>
              <ul>
                {userShareList.map((participant, index) => {
                  return (
                    <div key={index}>
                      <ExpenseUserListItem
                        index={index}
                        participant={participant.member}
                        key={index}
                        remove={() =>
                          removeExpenseParticipant(participant.member)
                        }
                        expenseType={expenseType}
                      />
                      <input
                        disabled={expenseType === "EQUAL"}
                        type="number"
                        value={participant.share}
                        onChange={(e) => handleShareChange(e, index)}
                      />
                      {expenseType === "PERCENT" && <>🦴</>}
                    </div>
                  );
                })}
              </ul>
              {expenseType != "EQUAL" && remainingAmountToSubmit != 0 && (
                <p>
                  {remainingAmountToSubmit < 0
                    ? `Amount exceeds by ${remainingAmountToSubmit * -1}`
                    : `Amount remaining by ${remainingAmountToSubmit}`}
                  {expenseType == "PERCENT" ? "%" : ""}
                </p>
              )}
            </div>
          )}
          {totalAmount != 0 && <button type="submit">Add expense</button>}
        </form>
      </div>
    </div>
  );
}
