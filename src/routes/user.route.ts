import exporess from 'express';
import {createUser, deleteUser, getUser, updateUser} from '../controllers/UserController';
import { login, verifyToken } from '../controllers/AuthenticationController';
import protect from '../middleware/authMiddleware';

const router = exporess.Router();

router.post('/api/user', createUser);
router.put('/api/user', protect, updateUser);
router.get('/api/user', protect, getUser);
router.delete('/api/user', protect, deleteUser);

router.post('/api/auth/login', login);
router.get('/api/auth/verify', protect, verifyToken);

module.exports = router;