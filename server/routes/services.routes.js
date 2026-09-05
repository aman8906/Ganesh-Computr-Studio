import { Router } from 'express';
import { listServices, getServiceBySlug, listCategories } from '../controllers/services.controller.js';

const router = Router();

router.get('/services', listServices);
router.get('/services/:slug', getServiceBySlug);
router.get('/categories', listCategories);

export default router;
