import express from 'express';

import { add, edit, all } from '../controller/UserController';
import UserModelSync from '../middleware/UserModelSync';
import { middlewares, login } from '../controller/authenticateController';

const router = express.Router();

router.post('/auth/login', UserModelSync, login);
router.post('/user/add', middlewares.authenticate, UserModelSync, add);
router.put('/user/edit', middlewares.authenticate, UserModelSync, edit);
router.get('/user/all',   UserModelSync, all);

export default router;