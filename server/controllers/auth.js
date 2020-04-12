const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/Users');

// Register a new user
exports.register = asyncHandler(async (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;

    // Create new user
    const user = await User.create({
        email,
        firstName,
        lastName,
        password
    });

    // // Create token
    // const token = user.generateJWT();

    // res.status(200).json({ msg: 'success', token: token})

    sendTokenRes(user, 200, res);
})

// Login for existing user
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if(!email || !password){
        return next(new ErrorResponse('Please provide email and password', 400))
    }

    // Check for user
    const user = await User.findOne({ email: email}).select('+password');

    //Validating user exist
    if(!user){
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Check if password is valid
    const isValid = await user.validPassword(password);

    if(!isValid){
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // // Create token
    // const token = user.generateJWT();

    // res.status(200).json({ msg : 'success', token: token })

    sendTokenRes(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenRes = (user, statusCode, res) => {
    const token = user.generateJWT();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        msg: 'success',
        token
    })
};

// Get current logged in user
exports.currentUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        msg: 'success',
        data: user
    });
});