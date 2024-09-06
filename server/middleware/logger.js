import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/jwtToken.js';

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        // Check if the fields are empty
        return res.status(400).json({ message: 'Please enter your credentials to log in' });
    } else {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                generateToken(res, user._id);
                return res.status(200).json({ message: `Welcome ${user.name}, you are logged in :)` });
            } else {
                return res.status(401).json({ message: 'Password incorrect. Try with the correct one or register (it\'s free)' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
});

const logout = asyncHandler(async (req, res, next) => {
    try {
        // Check if there is a JWT token in cookies
        if (!req.cookies || !req.cookies.JWT) {
            return res.status(400).json({ message: "No active session" });
        }
        res.clearCookie("JWT", {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== "development",
            path: '/',
        });
        return res.status(200).json({ message: "User logged out" });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out" });
    }
});

const logger = {
    login,
    logout
};

export default logger;