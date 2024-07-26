import exporess from 'express';
import UserModel from '../models/user.model';
import { Profile } from '../types/User.type';
import {createUser} from '../controllers/UserController';

const router = exporess.Router();

router.post('/api/users', createUser);

module.exports = router;