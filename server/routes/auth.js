const express = require('express');
const { register, login, currentUser } = require('../controllers/auth')

const authRouter = express.Router();

// gives acccess to req.user which is needed to get cuurent user
const { protect } = require('../middleware/auth');

//Signup
authRouter.post('/register', register);

//Login
authRouter.post('/login', login);

authRouter.get('/currentUser', protect, currentUser);

module.exports = authRouter;