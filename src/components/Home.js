import React, { useEffect } from 'react'
import { signInWithGoogle, supabase, signOutWithGoogle } from '../supabase/utils/supabase.utils'
import axios from 'axios';


export default function Home() {
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == 'SIGNED_IN') {
        const authorizationHeader = {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }

        const response = await axios.get('http://localhost:3030/login', authorizationHeader)
        const {name,email,phoneNumber} = response.data;
        console.log(email)
      }
    });
  }, [])
  return (
    <div>
      <button onClick={signInWithGoogle}>
        Sign in
      </button>
      <button onClick={signOutWithGoogle}>
        Sign out
      </button>
    </div>
  )
}
