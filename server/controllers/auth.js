const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
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

    sendTokenRes(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenRes = (user, statusCode, res) => {
    const token = user.generateJWT();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production') {
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
exports.currentUser = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        msg: 'success',
        data: user
    });
});

// Forgot password method
exports.forgotPassword = asyncHandler( async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorResponse('There is no user with that email', 404))
    }

    // Get reset token, Method inside of user model
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    
    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/authRouter/resetpassword/${resetToken}`

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })

        res.status(200).json({
            msg: 'success',
            data: 'Email sent'
        });
        
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500))
    }
});

// Reset password
exports.resetPassword = asyncHandler( async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

    // Get user by resetpassword token and password expire that is greater then now
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenRes(user, 200, res);
})

//update user details
exports.updateUserDetails = asyncHandler( async (req, res, next) => {
    
    const fieldsUpdated = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsUpdated, {
        new: true,
        runValidators: true,
        context: 'query'
    });

    res.status(200).json({
        msg: 'Success',
        data: user
    });
});

// update password
exports.updatePassword = asyncHandler( async (req, res, next) => {
    // Find the current logged in user and the password
    const user = await  User.findById(req.user.id).select('+password');

    // Check current password
    if(!(await user.validPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Incorrect password', 401))
    };

    user.password = req.body.newPassword;
    await user.save();

    sendTokenRes(user, 200, res);
})