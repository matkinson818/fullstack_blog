const express = require('express');

// registering user and authentication
const { 
    register, 
    login, 
    currentUser,
    forgotPassword,
    resetPassword,
    updateUserDetails,
    updatePassword
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
authRouter.put('/updateuserdetails', protect, updateUserDetails);
authRouter.post('/forgotpassword', forgotPassword);
authRouter.put('/resetpassword/:resetToken', resetPassword);
authRouter.put('/updatepassword', protect, updatePassword);


module.exports = authRouter;