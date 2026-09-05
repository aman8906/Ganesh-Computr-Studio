import { Router } from 'express';
import { getBusiness } from '../controllers/business.controller.js';

const router = Router();

router.get('/business', getBusiness);

export default router;
