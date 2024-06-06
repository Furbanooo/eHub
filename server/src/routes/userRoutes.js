import express from 'express';
import { createUser, getUsers } from '../controllers/userControllers.js';

const userRoutes  = () => {
    const router = express.Router();

    router.post('/', createUser);
    router.get('/', getUsers);

    return router;
}

export default userRoutes;
