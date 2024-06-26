import Button from "react-bootstrap/Button"
import "../home/home.css"
import Piechart from "../../svg/pie-chart.svg"
import Typewriter from 'typewriter-effect'
import { useAuth } from '../../authentication/useAuth'
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const { signIn, isLoading, session } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    const loginUser = async () => {
      if (session && session.access_token) {
        try {
          const authorizationHeader = { headers: { 'Authorization': `Bearer ${session.access_token}` } }
          const response = await axios.get("http://localhost:3030/loginUser", authorizationHeader)
          console.log(response.data)
          if (response.data && response.data.doesUserExist) {
            navigate("/dashboard")
          }
          if (response.data && !response.data.doesUserExist) {
            navigate("/onboard")
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    loginUser()

  }, [session])

  const handleGetStarted = async () => {
    await signIn()
  }

  return (
    <div className='parent-container'>
      <div className='svg-container'>
        <img src={Piechart} id='svg-piechart' />
      </div>
      <div className='siginin-signup-container'>
        <Typewriter
          options={{
            strings: ["SplitKaro", "Khata book", "Vasooli"],
            autoStart: true,
            loop: true,
            wrapperClassName: "typewriter"
          }}
        />
        {
          !isLoading ? (<Button onClick={handleGetStarted} variant="success">
            Get Started
          </Button>) : <div>Sign in hoja.....sign in hoja....hojaaaa</div>
        }
      </div>
    </div>
  )
}
