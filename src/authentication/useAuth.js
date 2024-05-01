import { useEffect, useState } from "react"
import { supabase } from "../supabase/utils/supabase.utils"
import { Navigate, useNavigate } from "react-router-dom"
import axios from 'axios';


export const useAuth = ()=>{
    const [session, setSession] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const supabase_session = "supabase_session"
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("NOw storing")
    
        const {data} = supabase.auth.onAuthStateChange(async (event, session)=>{        
            setIsLoading(true)
            if(event == "SIGNED_IN"){
                console.log("SIGNED_IN")
                setSession(session)
                const {data} = await fetchData(session.access_token)
                setUserData(data)
                //localStorage.setItem("userResponse", JSON.stringify(data))
                localStorage.setItem(supabase_session, JSON.stringify(session))
            }
            setIsLoading(false)
        })

        return ()=>{
            data.subscription.unsubscribe()
        }

    }, [])

    
    const fetchData = async (token)=>{
        const userResponse = await supabase.auth.getUser(token)
        console.log(userResponse)
        return userResponse
    }

    const signIn = async()=>{
        setIsLoading(true)
        try {
            const { user,session,error} = await supabase.auth.signInWithOAuth({
                provider: 'google'
                // options: {
                //     redirectTo: 'http://localhost:3000/dashboard'
                // },
            })
        } 
        catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const signOut = async()=>{
        const {error} = await supabase.auth.signOut() 
        if(error){
            console.log("Error signing out:", error)
        }else{
            console.log("Signed out successfully")
            setSession(null)
            setUserData(null)
            localStorage.clear()
            navigate('/')
        }
    }

    return {session, isLoading, userData, signIn, signOut, fetchData}
}