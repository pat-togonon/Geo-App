const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createAccount =  async (request, response) => {

  const username = request.body.username?.trim().toLowerCase()
  const password = request.body.password?.trim()

  if (!password || password.length < 5) {
    return response.status(400).json({ error: 'Password should have at least 5 characters.' })
  }

  if (!username || username.length < 5) {
    return response.status(400).json({ error: 'Usernames should have at least 5 characters.' })
  }

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({ error: 'Username already exists.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash
  })

  await newUser.save()
  
  return response.status(201).json({ message: 'Account created successfully.' })

}

const login = async (request, response) => {
  
  const username = request.body.username?.trim().toLowerCase()
  const password = request.body.password?.trim()

  if (!password) {
    return response.status(400).json({ error: 'Password is required' })
  }

  if (!username) {
    return response.status(400).json({ error: 'Username is required' })
  }

  const userToLogin = await User.findOne({ username })

  if (!userToLogin) {
    return response.status(401).json({ error: 'User not found or invalid.' })
  }
  
  const passwordCorrect = await bcrypt.compare(password, userToLogin.passwordHash)

  if (!(userToLogin && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid username or password.' })
  }

  const userForToken = {
    username: userToLogin.username,
    id: userToLogin._id
  }

  //update expiry
  const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60min'})

  const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

  response.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: 'false',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })

  return response.status(200).send({ accessToken, username: userToLogin.username, id: userToLogin._id })

}

module.exports = {
  createAccount,
  login
}