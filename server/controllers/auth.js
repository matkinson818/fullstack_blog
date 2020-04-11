const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/Users');

exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, firstName, lastName, password } = req.body;

    const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        password
    });

    res.status(200).json({ msg: 'success'})
})
