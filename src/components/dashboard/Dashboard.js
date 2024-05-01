import React from 'react'
import { useAuth } from '../../authentication/useAuth'
import { Outlet } from 'react-router-dom'


function BabyDashboard({signOut}){
  const session = JSON.parse(localStorage.getItem("supabase_session"))

  console.log(session)

  return (
    <div>
      Congratulations!, Welcome to Dashboard 
      <button onClick={signOut}>
        Sign out
      </button>
    </div>
    )
}
export default function Dashboard() {
  const {signOut} = useAuth()
  return <BabyDashboard signOut={signOut} />
  
}
