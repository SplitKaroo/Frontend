import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import "../group/GroupAddition.css"
import { ToastContainer, toast } from 'react-toastify';
const session = JSON.parse(localStorage.getItem("supabase_session"));

export default function GroupAddition({groupDetail}) {
    const [memberName, setMemberName] = useState("")
    const [userSuggestions, setUserSuggestions] = useState([])
    const showUserSuggestion = useRef(true)

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }

    const fetchUserSuggestions = async (memberName) => {
        if (session && session.user && session.user.aud === "authenticated") {
            const config = {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
            }
            const response = await axios.get(`http://localhost:3030/searchWithSubstring?searchString=${memberName}`, config)
            setUserSuggestions(response.data)
        }
    }

    const debouncedFetchUserSuggestions = useCallback(debounce(fetchUserSuggestions, 600), [])

    useEffect(() => {
        if (memberName.length > 0) {
            debouncedFetchUserSuggestions(memberName)
        } 
    }, [memberName,debouncedFetchUserSuggestions])

    const handleChange = (event) => {
        let query = event.target.value
        setMemberName(query)
        if(query.length==0){
            setUserSuggestions([])
            showUserSuggestion.current = false
        }else{
            showUserSuggestion.current = true
        }
        console.log(query.length)
    }

    const addMember = async (userName) => {
        if (session != null && session.user != null && session.user.aud != null && session.user.aud == "authenticated"){
            const data = {
                userToBeAddedName: userName,
                groupName: groupDetail.groupName,
                groupCreatorName: groupDetail.creatorName
            }
            const config = {
                headers:{
                    'Authorization':`Bearer ${session.access_token}`
                }
            }

            toast.promise(
                axios.post("http://localhost:3030/groups/addUserToGroup", data, config),
                {
                    success: {
                        render({data}){
                            if(data.data === "User already part of group"){
                                return "Member already exist in the group"
                            }else{
                                return "Member added in the group"
                            }
                        }
                    },
                    error: "Member could not be added",
                    pending: "Adding member"
                }
            )
        }
    }
    
    return (
        <div className='member-add-form-container'>
            <form>
                <input type='text' placeholder='Type member name to search' onChange={handleChange} />
                <ul>
                    {showUserSuggestion.current && userSuggestions.map((user, index) => (
                        <li key={index} onClick={()=>addMember(user.name)}>
                            <p>{user.name}</p>
                        </li>
                    ))}
                </ul>
            </form>
            <ToastContainer autoClose={1000}/>
        </div>
    )
}
