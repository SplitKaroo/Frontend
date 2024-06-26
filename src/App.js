import React from 'react'
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Onboard from './components/onboard/Onboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/App.css"

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      )
    },
    {
      path: "/onboard",
      element:(
        <ProtectedRoute>
          <Onboard/>
        </ProtectedRoute>
      )
    }
  ])
    return <RouterProvider router={router} />
  
}
