const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const User = require('./models/User')


mongoose.set('strictQuery', false)
console.log('connecting to MongoDB')

mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const app = express()

app.use(express.json())

// to delete 
app.get('/', (request, response) => {
  response.send(`<div>Hello Pat!</div>`)
})

app.use('/api/auth', authRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)



module.exports = app