import React, { useContext } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserContext, UserProvider } from './contexts/UserContext';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "/dashboard",
//     element:(
//       <ProtectedRoute>
//         <Dashboard />
//       </ProtectedRoute>
//     ) 
//   }
// ])

export default function App() {

  const { state } = useContext(UserContext)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
