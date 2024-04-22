// ProtectedRoute.js
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Route, useNavigate ,Navigate  } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Home from '../components/Home';

const ProtectedRoute = ({ children}) => {
  const {state} = useContext(UserContext)
  const storedUser = JSON.parse(localStorage.getItem("userData"))
  console.log(storedUser)
  console.log(state)
  if(storedUser && storedUser.authenticated){
    return children
  }
  if(state.loading){
    return <>Loading</>
  }
    
  if (!state.authenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;