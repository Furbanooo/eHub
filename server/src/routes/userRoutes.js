import express from 'express';
import userControllers from '../controllers/userControllers.js';

const userRoutes = express.Router();

userRoutes.post('/register', userControllers.registerUser);
userRoutes.post('/login', userControllers.loginUser);
userRoutes.get('/', userControllers.getUsers);

export default userRoutes;