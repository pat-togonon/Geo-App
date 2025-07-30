const axios = require('axios')
require('dotenv').config()
const ipRouter = require('express').Router()

const baseUrl = 'https://ipinfo.io'

// user IP

ipRouter.get('/ipinfo', async (request, response) => {

  const res = await axios.get(`${baseUrl}/json`)
  return response.json(res.data)

})

// search for IP info

ipRouter.get('/ipinfo/:ip', async (request, response) => {

  const ip = request.params.ip
  const res = await axios.get(`${baseUrl}/${ip}/geo`)
  return response.json(res.data)
})

module.exports = ipRouter