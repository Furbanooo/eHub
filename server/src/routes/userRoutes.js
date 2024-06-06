const { Router } = require('express');
const router = Router();
const { createUser, getUsers } = require('../userControllers');
//const { createUser, getUsers } = require('../controllers/userControllers');

router.post('/', createUser);
router.get('/', getUsers);

export default router;