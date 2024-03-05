import React, { useContext } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserContext } from './contexts/UserContext';

export default function App() {
  const {currentUser} = useContext(UserContext)
  return (
    <Routes>
      <Route path="signin" element={<Home/>}/>
      {/* <ProtectedRoute path="private" component={<Dashboard/>}/> */}
      <Route path="dashboard" render={(props)=>{currentUser?<Dashboard/>:<Home/>}}/>
    </Routes>
  )
}
