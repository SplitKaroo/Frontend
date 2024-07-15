import React, { useEffect, useState } from "react";
import Group from "../group/Group";
import "../dashboard/Dashboard.css";
import Friend from "../friends/Friend";
import Menu from "../menu/Menu";
import axios from "axios";
import Transaction from "../transaction/Transaction";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Transactions");
  const [session, setSession] = useState(null);
  const [relatedGroups, setRelatedGroups] = useState([]);
  const [groupDetail, setGroupDetail] = useState({
    groupName: "",
    creatorName: "",
  });
  var userData = null;
  var config = null;
  useEffect(() => {
    let storedSession = JSON.parse(localStorage.getItem("supabase_session"));
    setSession(storedSession);
  }, []);

  useEffect(() => {
    if (
      session != null &&
      session.user != null &&
      session.user.aud != null &&
      session.user.aud == "authenticated"
    ) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const relatedGroupsList = await getAllGroups();
      console.log(relatedGroupsList);
      if (relatedGroupsList) {
        setRelatedGroups(relatedGroupsList);
      } else {
        console.error("getAllGroups did not return a valid list");
      }
    } catch (error) {}
  };

  const getAllGroups = async () => {
    userData = {
      currentUserEmail: session.user.email,
      currentUserPhone: session.user.phone,
    };
    config = {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:3030/groups/getAllGroups",
        userData,
        config
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Error in getAllGroups", error);
      return [];
    }
  };

  const goToTransactionFromGroup = (groupName, creatorName) => {
    setGroupDetail({ groupName: groupName, creatorName: creatorName });
    setActiveComponent("Transactions");
  };

  const handleSetActiveComponent = (component) => {
    if (component != "Transactions") {
      setGroupDetail({ groupName: "", creatorName: "" });
    }
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Transactions":
        return <Transaction groupDetail={groupDetail} />;
      case "Friends":
        return <Friend />;
      case "Groups":
        return (
          <Group
            relatedGroups={relatedGroups}
            goToTransactionFromGroup={goToTransactionFromGroup}
          />
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-container-heading">
        <h2>My Dashboard 🪙</h2>
      </div>
      <div className="menu-item">{renderComponent()}</div>
      <div className="footer-container">
        <Menu setActiveComponent={handleSetActiveComponent} />
      </div>
    </div>
  );
}
