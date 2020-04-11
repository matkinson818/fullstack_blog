const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt =  require('jsonwebtoken');
const secret = require('../app').secret;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        'is invalid']
    },
    firstName: {
        type: String,
        required: [true, 'Firstname is required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    hash: String,
    salt: String
})

// userSchema.methods.setPassword = (password) => {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash - crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// userSchema.methods.validPassword = (password) => {
//     let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// }

// userSchema.methods.generateJWT = () => {
//     let today = new Date();
//     let exp = new Date(today);
//     exp.setDate(today.getDate() + 60);

//     return jwt.sign({
//         id: this._id,
//         username: this.username,
//         exp: parseInt(exp.getTime() / 1000),
//     }, secret)
// }

userSchema.plugin(uniqueValidator, {message: 'is already taken.'})

module.exports = mongoose.model('User', userSchema);
