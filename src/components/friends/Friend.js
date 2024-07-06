import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast, render } from "react-toastify";

const session = JSON.parse(localStorage.getItem("supabase_session"));

export default function Friend() {
  const [friendUserName, setFriendUserName] = useState("");
  const addFriend = async (event) => {
    console.log("c");
    event.preventDefault();
    if (
      session != null &&
      session.user != null &&
      session.user.aud != null &&
      session.user.aud == "authenticated"
    ) {
      const data = {
        friendUserName: friendUserName,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      };

      toast.promise(
        axios.post("http://localhost:3030/addFriend", data, config),
        {
          success: {
            render({ data }) {
              if (data.data === "Already friends") {
                return "Friend already exist";
              } else {
                return "Friend added";
              }
            },
          },
          error: "Group could not be created",
          pending: "Creating Group",
        }
      );
    }
  };

  return (
    <div>
      <form onSubmit={addFriend}>
        <input
          type="text"
          placeholder="Enter friend username"
          onChange={(e) => setFriendUserName(e.target.value)}
        />
        <input type="submit" value={"Add Friend"} />
      </form>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
