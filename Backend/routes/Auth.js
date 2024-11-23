import express from 'express';
import { loginUser, registerUser, getProfile, createGuestUser } from '../controllers/authController.js';

const router = express.Router();
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', getProfile);
router.post('/guest', createGuestUser);

export default router; 