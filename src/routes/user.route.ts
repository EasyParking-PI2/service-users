import exporess from 'express';
import {createUser, updateUser} from '../controllers/UserController';
import { login } from '../controllers/AuthenticationController';
import protect from '../middleware/authMiddleware';

const router = exporess.Router();

router.post('/api/users', createUser);
router.put('/api/users', protect, updateUser);

router.post('/api/auth/login', login);

module.exports = router;