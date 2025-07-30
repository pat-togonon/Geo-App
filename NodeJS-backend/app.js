const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const User = require('./models/User')
const cors = require('cors')
const ipRouter = require('./controllers/ip')


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

const corsOption = {
  origin: true,
  credentials: true
}

app.use(cors(corsOption))

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api', ipRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)



module.exports = app