import express from 'express';

import { add, edit, all } from '../controller/UserController';
import UserModelSync from '../middleware/UserModelSync';

const router = express.Router();

router.post('/user/add', UserModelSync, add);
router.put('/user/edit', UserModelSync, edit);
router.get('/user/all', UserModelSync, all);

export default router;