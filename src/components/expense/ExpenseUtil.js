import axios from "axios";

export function addExpenseUtility(
  expenseName,
  totalAmount,
  expenseType,
  payeeName,
  userShareList,
  groupName,
  groupCreatorName,
  session
) {
  const config = {
    headers: {
      authorization: `Bearer ${session.access_token}`,
    },
  };
  const expenseData = {
    expenseName: expenseName,
    totalAmount: totalAmount,
    expenseType: expenseType,
    payeeName: payeeName,
    userShareList: userShareList,
    groupName: groupName,
    groupCreatorName: groupCreatorName,
  };
  try {
    axios
      .post("http://localhost:3030/addExpense", expenseData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {}
}
