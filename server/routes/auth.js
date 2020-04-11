const express = require('express');
const { register, login } = require('../controllers/auth')

const authRouter = express.Router();

//Signup
authRouter.post('/register', register);

//Login
authRouter.post('/login', login);

module.exports = authRouter;