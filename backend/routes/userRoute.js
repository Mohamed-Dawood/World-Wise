import express from 'express';
import { getAllUsers, register, login } from '../controllers/authController.js';

const router = express.Router();

router.route('/').get(getAllUsers);

router.route('/login').post(login);

router.route('/register').post(register);

export default router;
