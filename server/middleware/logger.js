import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/jwtToken.js'

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        //check if the fields are empty 
        res.status(400).json({ message: 'PLS enter you credentials to logIN' });
    } else {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                generateToken(res, user._id);
                res.status(201).json({ message: `welcome ${user.name}, you are logged in :)` });
            } else {
                res.send({ message: 'Password incorrect try with the correct one or register (it\'s free)' });
            }
        } catch (error) { res.status(500).send({ message: error.message }) }


    }
});

const logout = asyncHandler(async (req, res, next) => {
    ; try {
        // 1. Check if there is a JWT token in cookies
        if (!req.cookies) {
            return res.status(400).json({ message: "no active session" })
        }
        res.clearCookie("JWT", {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== "development",
            path: '/',
        });
        res.status(200).json({ message: "User logged out" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out" });
    }
});

const logger = {
    login,
    logout
}
export default logger;