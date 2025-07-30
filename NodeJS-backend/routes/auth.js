const authRouter = require('express').Router()
const { createAccount, login } = require('../controllers/auth')

//user creation
authRouter.post('/users', createAccount)

//user login
authRouter.post('/login', login)

module.exports = authRouter