import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Navigate } from 'react-router-dom'
import { signOutWithGoogle } from '../../supabase/utils/supabase.utils'



export default function Dashboard() {
    const {state} = useContext(UserContext)
    console.log(state.currentUser)
    return (
    <div>Congratulations!, Welcome to Dashboard 
      <button onClick={signOutWithGoogle}>
        Sign out
      </button>
    </div>
  )
}
