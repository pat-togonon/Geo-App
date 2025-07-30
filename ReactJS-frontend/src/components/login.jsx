import { useState } from "react"
import { loginWith } from "../service/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

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
      const loggedInUser = await loginWith(userToLogin)
      localStorage.setItem('loggedIn', 'true')
      console.log('user is', loggedInUser)
      console.log('successful login')
      navigate('/')
    } catch (error) {
      console.log(error.response.data.error)
    }

    setUsername('')
    setPassword('')
  }


  return (
    <>
      <h2>Log in to access your account</h2>
      <form onSubmit={handleLogin}>
        <div>username: <input type="text" value={username} autoComplete="current-username" required onChange={({ target }) => setUsername(target.value)}/></div>
        <div>password: <input type="password" value={password} autoComplete="current-password" required onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )



}

export default Login