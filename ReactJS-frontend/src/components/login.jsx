import { useState } from "react"
import { loginWith } from "../service/auth"
import { useNavigate } from "react-router-dom"
import { useErrorStore } from "../store/errorStore"
import Error from "./error"

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setErrorMessage = useErrorStore(state => state.setErrorMessage)
  const clearErrorMessage = useErrorStore(state => state.clearErrorMessage)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!username || !password) {
      console.log('Username and password are required.')
      return
    }

    const userToLogin = {
      username,
      password
    }

    try {
      await loginWith(userToLogin)
      localStorage.setItem('loggedIn', 'true') //to persist the login 
      navigate('/')
    } catch (error) {
      setError(true)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        clearErrorMessage()
        setError(false)
      }, 5000)
     
    }

    setUsername('')
    setPassword('')
  }


  return (
    <div className="loginDiv">
      <h1>Geolocate any IP in seconds</h1>
      <div className="formDiv">
      <h2>Log in to access your account</h2>
      {error && <div className="errorDiv">
        <Error />
      </div>}
      <form onSubmit={handleLogin}>
        <div className="loginField">username: <input type="text" value={username} autoComplete="current-username" required onChange={({ target }) => setUsername(target.value)}/></div>
        <div className="loginField">password: <input type="password" value={password} autoComplete="current-password" required onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit" className="loginButton">Log in</button>
      </form>
      </div>
    </div>
  )



}

export default Login