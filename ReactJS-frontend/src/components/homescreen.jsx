import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserIP } from "../service/ip"
import IpDetails from "./ipdetails"


const HomeScreen = () => {
  const [userIp, setUserIp] = useState('')

  const navigate = useNavigate()
  const isUserLoggedIn = localStorage.getItem("loggedIn")

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/login')
    }
  }, [isUserLoggedIn])

  useEffect(() => {
    fetchUserIp()
  },[])

  const fetchUserIp = async () => {

    try {
      const userIpTofetch = await getUserIP()
      setUserIp(userIpTofetch)
      console.log(userIpTofetch)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Your IP Address & Geolocation Info</h2>
      <div>


      </div>
      <IpDetails ip={userIp} />      

    </>
  )

}

export default HomeScreen