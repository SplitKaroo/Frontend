// ProtectedRoute.js
import React, {useEffect, useState} from 'react';
import { useAuth } from '../authentication/useAuth';

const ProtectedRoute = ({children}) => {
  const {fetchData, userData, session} = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    async function fetchDataFromBackend(){
      const supabase_session = JSON.parse(localStorage.getItem("supabase_session"))
      console.log(supabase_session)
      if(supabase_session && supabase_session.access_token){
        console.log(supabase_session.access_token)
        const {data,error} = await fetchData(supabase_session.access_token)
        data.user.aud === "authenticated" && data.user.role === "authenticated" ? setIsAuthenticated(true) : setIsAuthenticated(false)
      }
    }
    fetchDataFromBackend()
  },[])

  if(isAuthenticated){
    return children
  }
  else{
    return <div>Loading</div>
  }
};

export default ProtectedRoute;