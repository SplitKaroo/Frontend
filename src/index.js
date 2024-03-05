import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import { UserContext, UserProvider } from './contexts/UserContext';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const isAuthenticatedLoader = async () => {
//   try {
//     if (localStorage.length == 0) {
//       return redirect("/")
//     }
//     const [authTokenKey, authTokenValue] = Object.entries(localStorage).find(([key, value]) => key.endsWith('-auth-token'));
//     const authTokenValueJson = JSON.parse(authTokenValue)

//     const authorizationHeader = {
//       headers: {
//         'Authorization': `Bearer ${authTokenValueJson['access_token']}`
//       }
//     }
//     const response = await axios.get('http://localhost:3030/login', authorizationHeader)
//     if (!response || !response.data) {
//       return redirect("/")
//     }
//     return null
//   } catch (error) {
//     console.log(error)
//   }
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);


