import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/jwtToken.js'

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: 'PLS enter you credentials to register' });
    }

    //check if the user exist in the db
    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (userExist) {
        res.status(400).json({ message: 'User already exist, login or try another email' });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });

    //save the new user into the db
    try {
        await newUser.save();
        generateToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const userInfo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    try {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            const { name, email } = req.body;

            user.name = name || user.name;
            user.email = email || user.email;

            const updatedUser = await user.save();
            generateToken(res, user._id); // Generate a new token
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            // Invalid user ID format
            res.status(404).json({ message: "User not found" });
        } else {
            // Other errors (e.g., validation errors, database connection issues)
            res.status(500).json({ message: error.message }); // Use error.message for more details
        }
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting user:", error);
        if (error.name === "CastError") {
            res.status(400).json({ message: "Invalid user ID" });
        } else {
            res.status(500).json({ message: "Error deleting user" });
        }
    }
});

const userControllers = {
    getAllUsers,
    createUser,
    userInfo,
    updateUser,
    deleteUser
};

export default userControllers