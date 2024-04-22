import { createContext, useContext, useState, useEffect } from "react";
import { signInWithGoogle, supabase, signOutWithGoogle } from '../supabase/utils/supabase.utils'
import axios from 'axios';

const key = "userData"
export const UserContext = createContext({
    currentUser: null,
    loading: false,
    authenticated: false,
    setState: () => null,
})

export const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        currentUser: null,
        loading: true,
        authenticated: false,
    })


    useEffect(() => {
        try {

            const fetchUserData = async (session) => {
                try {
                    const authorizationHeader = { headers: { 'Authorization': `Bearer ${session.access_token}` } };
                    const response = await axios.get('http://localhost:3030/loginUser', authorizationHeader);
                    setState({currentUser: response.data,
                        loading: false,
                        authenticated:true
                    })
                    const localStorageUser = {
                        currentUser: response.data,
                        authenticated: true,
                    }
                    localStorage.setItem("userData", JSON.stringify(localStorageUser))
                    //setCurrentUser(response.data);
                } catch (error) {
                    setState({
                        loading: false,
                        authenticated: false
                    })
                    console.log(error.message);
                }
            };

            const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
                const storedUser = localStorage.getItem("userData");
                console.log(storedUser)
                if(storedUser){
                                                                                                 
                    const parsedStoredUser = JSON.parse(storedUser)
                    setState({
                        currentUser: parsedStoredUser.currentUser,
                        loading: false,
                        authenticated: parsedStoredUser.authenticated
                    })
                }
                //console.log(event)
                if (session && event === 'SIGNED_IN') {
                    setState({loading: true})
                    await fetchUserData(session)
                    console.log(state.currentUser)
                }
                if (event === 'SIGNED_OUT') {
                    localStorage.removeItem(key)
                    setState((prevState)=>({
                        loading:false,
                        currentUser:null,
                        authenticated: false
                    }));
                }
            });

            return () => {
                data.subscription.unsubscribe();
            };
        } catch (error) {
            console.log(error.message);
        }
    }, [state.authenticated]);

    const value = { state, setState }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

