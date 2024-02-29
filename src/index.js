import React from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import Home from './components/Home';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


// const supabase = createClient("https://uroiwmpasavxoygcfpqb.supabase.co",
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyb2l3bXBhc2F2eG95Z2NmcHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0NTA0OTksImV4cCI6MjAyNDAyNjQ5OX0.Rk5q6BjwiCpNg6KfQsPPgochaCJzJlZoY3_dHXMI1Bw")

// const App = () => (<Auth
//   supabaseClient={supabase}
//   appearance={{ theme: ThemeSupa }}
//   theme="dark"
//   providers={['google']}
// />)

root.render(
    <Home />
);


