import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast, render } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function GroupCreation() {
    let [groupName, setGroupName] = useState("")
    async function handleSubmit(event) {
        event.preventDefault();
        const session = JSON.parse(localStorage.getItem("supabase_session"))
        if (session.user.aud == "authenticated") {
            const groupData = {
                groupName: groupName,
                currentUserEmail: session.user.email,
                currentUserPhone: ""
            }
            const config = {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
            }
            // const response = await axios.post("http://localhost:3030/groups/addGroup", groupData, config)

            //Toast.promise returns a promise so you have to handle that promise if you want to use the data returned by axios request. 
            //Dont put await otherwise you will get error. It is already in a promise so await will be taken care of by the library.
            toast.promise(
                axios.post("http://localhost:3030/groups/addGroup", groupData, config),
                {
                    success: {
                        render({data}){
                            if(data.data === "Group already exist with this name created by you"){
                                return "Group already exist"
                            }else{
                                return "Group Created"
                            }
                        }
                    },
                    error: "Group could not be created",
                    pending: "Creating Group"
                }
            )
        }
    }
    function updateGroupName(event) {
        setGroupName(event.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Group Name' onChange={updateGroupName} />
                <input type='submit' value="Create Group" />
            </form>
            <ToastContainer autoClose={1000}/>
        </div>
    )
}
