import React, { Suspense, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import "../group/groupDetail.css"
import Typewriter from 'typewriter-effect'
import GroupCreation from './GroupCreation';
import { lazy } from 'react';
const GroupAddition = lazy(() => import('./GroupAddition'))


const session = JSON.parse(localStorage.getItem("supabase_session"))

function GroupItem({ groupDetail, show, setShow, listItemId}) {
  const isActive = listItemId===show
  return (
    <div className='group-detail-card-item'>
      <p>{groupDetail.groupName}</p>
      <div className='group-detail-card-item-creator-and-add-btn'>
        <p>{groupDetail.creatorName}</p>
        {!isActive && <button onClick={() => setShow(listItemId)}>Add</button>}
        {isActive && <Suspense fallback={"wait.."}>
          <div>
            <GroupAddition groupDetail={groupDetail} />
            <button onClick={() => setShow(null)}>❌</button>
          </div>
        </Suspense>}
      </div>
    </div>
  )

}

export default function GroupDetail() {
  const [relatedGroups, setRelatedGroups] = useState([])
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(null)
  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem("supabase_session"))
    setSession(storedSession)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (session != null && session.user != null && session.user.aud != null && session.user.aud == "authenticated") {
        try {
          const relatedGroupsList = await getAllGroups();
          if (relatedGroupsList) {
            setRelatedGroups(relatedGroupsList);
          } else {
            console.error("getAllGroups did not return a valid list")
          }
        }
        catch (error) {
          console.error("Error fetching groups: ", error)
        }
        finally {
          setLoading(false)
        }
      } else {
        console.error("Session or user information is not available")
        setLoading(false)
      }
    }
    if (session) {
      fetchData()
    }
  }, [session])

  const openModal = async () => {
    alert("Open modal")
  }
  const getAllGroups = async () => {
    if (session != null && session.user != null && session.user.aud != null && session.user.aud == "authenticated") {
      const userData = {
        currentUserEmail: session.user.email,
        currentUserPhone: session.user.phone
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      }
      try {
        const response = await axios.post("http://localhost:3030/groups/getAllGroups", userData, config)
        console.log(response)
        return response.data;
      } catch (error) {
        console.log("Error in getAllGroups", error)
        return []
      }
    }
  }
  if (loading) {
    return (<div>
      <Typewriter
        options={{
          strings: ["Loading your groups..."],
          autoStart: true,
          loop: true,
          wrapperClassName: "typewriter"
        }}
        className='group-loading'
      />
    </div>)
  }
  return (
    <div className='group-detail-card'>
      <h3>My Groups 👨🏼‍👩🏽‍👧🏻‍👦🏻</h3>
      <div className='group-list-container'>
        <ul className='group-list'>
          <li className='group-list-header'>
            <div className='group-detail-card-item'>
              <p>Group Name</p>
              <p>Group Creator</p>
            </div>
          </li>
          {relatedGroups.length > 0 ? (
            relatedGroups.map((value, index) => (
              <li key={index}><GroupItem groupDetail={value} show={show} setShow={setShow} listItemId={index}/></li>
            ))
          ) : (
            <p>No groups found</p>
          )}
        </ul>
      </div>
      <div className='group-create-card'>
        <GroupCreation />
      </div>

    </div>
  )
}
