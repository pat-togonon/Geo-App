import axios from "axios"

const url = 'http://localhost:8000/api'

export const getUserIP = async () => {
  const response = await axios.get(`${url}/ipinfo`)
  return response.data
}

export const searchForIp = async (ip) => {
  const response = await axios.get(`${url}/ipinfo/${ip}`)
  return response.data
}