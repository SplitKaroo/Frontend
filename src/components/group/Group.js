import React, { Suspense, useEffect } from "react";
import GroupDetail from "./GroupDetail";
import "../group/group.css";
import { lazy } from "react";

const GroupAddition = lazy(() => import("./GroupAddition"));

export default function Group(props) {
  return (
    <div className="group-container">
      <GroupDetail {...props} />
    </div>
  );
}
