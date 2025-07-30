//import api from "./api"
import axios from "axios"

const baseURL = import.meta.env.VITE_BASEURL

export const loginWith = async (userToLogin) => {
  const response = await axios.post(`${baseURL}/auth/login`, userToLogin)
  return response.data
}