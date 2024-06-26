import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

const session = JSON.parse(localStorage.getItem("supabase_session"));

export default function GroupAddition() {
    const [memberName,setMemberName] = useState("")
    const [userSuggestions, setUserSuggestions] = useState([])

    const debounce = (func,delay)=>{
        let timeoutId;
        return(...args)=>{
            if(timeoutId){
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(()=>{
                func(...args)
            },delay)
        }
    }
    const fetchUserSuggestions = async(memberName)=>{ 
        if(session && session.user && session.user.aud === "authenticated"){
            const config = {
                headers:{
                    'Authorization':`Bearer ${session.access_token}`
                }
            }
            console.log("query sent")
            const response = await axios.get(`http://localhost:3030/searchWithSubstring?searchString=${memberName}`,config)
            setUserSuggestions(response.data)
        }
    }

    const debouncedFetchUserSuggestions = useCallback(debounce(fetchUserSuggestions,600),[])

    useEffect(()=>{
        if(memberName.length>0){
            debouncedFetchUserSuggestions(memberName)
        }else{
            setUserSuggestions([])
        }
    },[memberName])

    const handleChange = (event)=>{
        let query = event.target.value
        setMemberName(query)
        console.log(memberName.length)
    }
    const addMember = (event)=>{
        event.preventDefault()
        console.log(userSuggestions)
    }
    return (
        <div className='member-add-form-container'>
            <form onSubmit={addMember}>
                <input type='text' placeholder='Type member name to search' onChange={handleChange}/>
                <ul>
                    {userSuggestions.map((user,index)=>(
                        <li key={index}>
                            <p>{user.name}</p>
                        </li>
                    ))}
                </ul>
                <button type='submit'>Add</button>
            </form>
        </div>
    ) 
}
