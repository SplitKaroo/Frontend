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

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);


