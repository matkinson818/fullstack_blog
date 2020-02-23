const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt =  require('jsonwebtoken');
const secret = require('../config').secret;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true
    },
    firstName: {
        type: String,
        required: [true, 'Firstname is required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    hash: String,
    salt: String
})

userSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash - crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = (password) => {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.plugin(uniqueValidator, {message: 'is already taken.'})

const User = mongoose.model('User', userSchema);
