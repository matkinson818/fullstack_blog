const express = require('express');

// registering user and authentication
const { 
    register, 
    login, 
    currentUser,
    forgotPassword
} = require('../controllers/auth')

const authRouter = express.Router();

// used to protect routes and authorize
const { 
    protect, 
    authorize 
} = require('../middleware/auth');

// Init routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/currentuser', protect, currentUser);
authRouter.post('/forgotpassword', forgotPassword);

module.exports = authRouter;