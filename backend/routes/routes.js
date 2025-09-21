import express from 'express';
import { register, login, protectedRoute } from '../controllers/user.js';
import { authenticateToken } from '../middlewares/middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, protectedRoute);

export default router;
