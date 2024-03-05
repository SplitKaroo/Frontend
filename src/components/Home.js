import React, { useContext, useEffect, useState } from 'react'
import { signInWithGoogle, supabase, signOutWithGoogle } from '../supabase/utils/supabase.utils'
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';


export default function Home() {

  const {currentUser, setCurrentUser} = useContext(UserContext)


  useEffect(() => {
    try {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event == 'SIGNED_IN') {
          const authorizationHeader = {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          }
          const response = await axios.get('http://localhost:3030/login', authorizationHeader)
          //const data = getUserInfo(authorizationHeader);
          setCurrentUser(response.data)
        }
        if(event == 'SIGNED_OUT'){
          setCurrentUser(null);
        }
      });
      return () => {
        data.subscription.unsubscribe();
      }
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  return (
    <div>
      {currentUser ? "someone is signed in" : "noone is signed in"}
      <button onClick={signInWithGoogle}>
        Sign in
      </button>
      <button onClick={signOutWithGoogle}>
        Sign out
      </button>
    </div>
  )
}
