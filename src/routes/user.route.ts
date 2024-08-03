import exporess from 'express';
import UserModel from '../models/user.model';
import { Profile } from '../types/User.type';
import {createUser} from '../controllers/UserController';
import { login } from '../controllers/AuthenticationController';

const router = exporess.Router();

router.post('/api/users', createUser);
router.post('/api/auth/login', login);

module.exports = router;