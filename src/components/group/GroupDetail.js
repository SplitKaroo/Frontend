import React, { Suspense, useEffect, useState } from "react";
import "../group/groupDetail.css";

import GroupCreation from "./GroupCreation";
import { lazy } from "react";
const GroupAddition = lazy(() => import("./GroupAddition"));

function GroupItem({
  groupDetail,
  show,
  setShow,
  listItemId,
  goToTransactionPage,
}) {
  const isActive = listItemId === show;
  return (
    <div className="group-detail-card-item">
      <p
        onClick={() =>
          goToTransactionPage(groupDetail.groupName, groupDetail.creatorName)
        }
      >
        {groupDetail.groupName}
      </p>
      <div className="group-detail-card-item-creator-and-add-btn">
        <p>{groupDetail.creatorName}</p>
        {!isActive && <button onClick={() => setShow(listItemId)}>Add</button>}
        {isActive && (
          <Suspense fallback={"wait.."}>
            <div>
              <GroupAddition groupDetail={groupDetail} />
              <button onClick={() => setShow(null)}>❌</button>
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default function GroupDetail(props) {
  const [show, setShow] = useState(null);
  return (
    <div className="group-detail-card">
      <h3>My Groups 👨🏼‍👩🏽‍👧🏻‍👦🏻</h3>
      <div className="group-list-container">
        <ul className="group-list">
          <li className="group-list-header">
            <div className="group-detail-card-item">
              <p>Group Name</p>
              <p>Group Creator</p>
            </div>
          </li>
          {props.relatedGroups.length > 0 ? (
            props.relatedGroups.map((value, index) => (
              <li key={index}>
                <GroupItem
                  groupDetail={value}
                  show={show}
                  setShow={setShow}
                  listItemId={index}
                  goToTransactionPage={props.goToTransactionFromGroup}
                />
              </li>
            ))
          ) : (
            <p>No groups found</p>
          )}
        </ul>
      </div>
      <div className="group-create-card">
        <GroupCreation />
      </div>
    </div>
  );
}
