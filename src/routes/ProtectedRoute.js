// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {currentUser} = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component key={props.location.key} {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;