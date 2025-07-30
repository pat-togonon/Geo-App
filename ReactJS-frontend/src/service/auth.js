import axios from "axios"

const baseURL = 'http://localhost:8000/api'

export const loginWith = async (userToLogin) => {
  const response = await axios.post(`${baseURL}/auth/login`, userToLogin)
  return response.data
}