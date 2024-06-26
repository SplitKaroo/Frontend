import React from 'react'
import { useAuth } from '../../authentication/useAuth'
import Group from '../group/Group'
import "../dashboard/Dashboard.css"


function BabyDashboard({signOut}){
  const session = JSON.parse(localStorage.getItem("supabase_session"))

  console.log(session)

  return (
    <div className='font-sans hover:font-serif'>
      Congratulations!, Welcome to Dashboard 
      <button onClick={signOut}>
        Sign out
      </button>
    </div>
    )
}
export default function Dashboard() {
  const {signOut} = useAuth()
  return (
    <div className='dashboard-container'>
      <div className='dashboard-container-heading'>
        <h2>My Dashboard 🪙</h2>
      </div>
      <div className=''>
        <Group/>
      </div>
    </div>
  )
  
}
