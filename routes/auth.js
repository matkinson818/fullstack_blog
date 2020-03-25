const express = require('express');
const User = require('../models/Users');
const authRouter = express.Router();
const jwt = require ('jsonwebtoken');

//Signup
authRouter.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (error, existingUser) => {
        // if (error) {
        //     res.sendStatus(500);
        //     return next(error);
        // }
        // if (exisingUser !== null) {
        //     res.status(400);
        //     return next(new Error("That username already exists"));
        // }
        const newUser = new User (req.body);
        newUser.save((error, user) => {
            if (error) {
                res.sendStatus(500);
                return next(error);
            }
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.status(201).send({success: true, user: user.toObject(), token});
        })
    })
});

//Login
authRouter.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (error, user) => {
        if (error) {
            return next(error);
        }
        if (!user || user.password !== req.body.password) {
            res.status(403);
            return next(new Error("Email and password are incorrect"));
        }
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.send({token: token, user: user.toObject(), success: true});
        })
    });

    module.exports = authRouter;