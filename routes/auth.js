const express = require('express');
const User = require('../models/Users');
const authRouter = express.Router();
const jwt = require ('jsonwebtoken');
const { register } = require('../controllers/auth')

//Signup
authRouter.post('/register', reister);

//Login
authRouter.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (error, user) => {
        if (error) {
            return next(error);
        }
        if (!user || user.password !== req.body.password) {
            res.sendStatus(403);
            return next(new Error("Email and password are incorrect"));
        }
            const token = jwt.sign(user.toObject)
            res.send({token: token, user: user.toObject(), success: true});
        })
    });

    module.exports = authRouter;