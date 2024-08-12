import express from "express";
import userControllers from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
import logger from "../middleware/logger.js";

const userRoutes = express.Router();

userRoutes.post('/register', userControllers.createUser);
userRoutes.post('/login', logger.login);
userRoutes.post('/logout', logger.logout);

userRoutes
    .get('/profile', authenticate, userControllers.userInfo) //get current user info (proile)
    .put('/profile', authenticate, userControllers.updateUser) //make change to the profile 
    .delete('/profile', authenticate, userControllers.deleteUser); //delete the account 

userRoutes // admin pritileges 
    .get('admin/accounts', authenticate, authorizeAdmin, userControllers.getAllUsers)
    .get('admin/accounts/:id', authenticate, authorizeAdmin, userControllers.userInfo)
    .put('admin/accounts/:id', authenticate, authorizeAdmin, userControllers.updateUser)
    .delete('admin/accounts/:id', authenticate, authorizeAdmin, userControllers.deleteUser);

export default userRoutes;