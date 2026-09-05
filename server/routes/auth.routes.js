import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema } from '../utils/schemas.js';
import { loginLimiter } from '../middleware/rateLimiters.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/auth/login', loginLimiter, validateBody(loginSchema), login);
router.post('/auth/logout', requireAuth, logout);
router.get('/auth/me', requireAuth, me);

export default router;
