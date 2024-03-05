import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Navigate } from 'react-router-dom'

export default function Dashboard() {
    const {currentUser} = useContext(UserContext)
    
  return (
    <div>Congratulations!, Welcome to Dashboard</div>
  )
}
