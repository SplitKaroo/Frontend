import React, { useEffect, useState } from "react";
import Expense from "../expense/Expense";
import History from "../history/History";
import axios from "axios";

export default function Transaction(props) {
  const [activeComponent, setActiveComponent] = useState("Expense");
  const [session, setSession] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getFriendsList = (config) => {
    axios
      .get("http://localhost:3030/getAllFriend", config)
      .then((response) => {
        setFriendList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getGroupMembers = (groupName, groupCreatorName, config) => {
    let groupData = {
      groupName: groupName,
      groupCreatorName: groupCreatorName,
    };
    axios
      .post("http://localhost:3030/groups/getGroupMembers", groupData, config)
      .then((response) => {
        setFriendList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          authorization: `Bearer ${session.access_token}`,
        },
      };

      if (
        props.groupDetail.groupName.length <= 0 ||
        props.groupDetail.creatorName.length <= 0
      ) {
        getFriendsList(config);
      } else {
        console.log(config);
        getGroupMembers(
          props.groupDetail.groupName,
          props.groupDetail.creatorName,
          config
        );
      }

      axios
        .get("http://localhost:3030/getUserByEmail", config)
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [session]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Expense":
        return (
          <Expense
            groupName={props.groupDetail.groupName}
            groupCreator={props.groupDetail.creatorName}
            memberList={friendList}
            currentUser={currentUser}
            session={session}
          />
        );
      case "History":
        return <History session={session} currentUser={currentUser} />;
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
      <div className="transaction-container-child">
        {currentUser && renderComponent()}
      </div>
    </div>
  );
}
