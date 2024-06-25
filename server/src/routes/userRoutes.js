import express from 'express';
import userControllers from '../controllers/userControllers.js';

const userRoutes  = () => {
    const router = express.Router();

    router.post('/', userControllers.createUser);
    router.get('/', userControllers.getUsers);

    return router;
}

export default userRoutes;
