const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide all fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all fields');
    }

    //find user
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    //create token
    const accessToken = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    },
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }
    );

    if (accessToken) {
        res.status(200).json({
            accessToken,
            username: user.username,
            email: user.email
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});


//@desc Get current user
//@route GET /api/users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUser };