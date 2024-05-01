import React, { useEffect, useState } from 'react'
import "./onboard.css"
import Button from 'react-bootstrap/esm/Button'
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Onboard() {
  let [username, setUsername] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("supabase_session"))
    const doesUserExist = localStorage.getItem("doesUserExist")

    if(session && session.access_token && doesUserExist){
      navigate("/dashboard")
    }
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    const session = JSON.parse(localStorage.getItem("supabase_session"))
    const doesUserExist = localStorage.getItem("doesUserExist")

    if (session && session.access_token) {
      if (doesUserExist) {
        navigate("/dashboard")
      }

      const data = {
        name: username,
        email: session.user.email,
        phoneNumber: session.user.phone
      }
      const authorizationHeader = { headers: { 'Authorization': `Bearer ${session.access_token}` } }

      axios.post("http://localhost:3030/onboardUser", data, authorizationHeader)
        .then(response => {
          navigate("/dashboard")
          localStorage.setItem("doesUserExist", true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      navigate("/")
    }

  }

  const updateUsername = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div className='main-container'>
      <form onSubmit={handleSubmit} className='form-container'>
        <Typewriter
          options={{
            strings: ["What should we call you?"],
            autoStart: true,
            loop: true,
            wrapperClassName: "typeWriter",
            pauseFor: 1500
          }}
        />
        <input id='username' type='text' onChange={updateUsername} />
        <Button variant="success" onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}
