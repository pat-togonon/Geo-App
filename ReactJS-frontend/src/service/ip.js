import axios from "axios"

const url = import.meta.env.VITE_IP_API

export const getUserIP = async () => {
  const response = await axios.get(url)
  return response.data
}