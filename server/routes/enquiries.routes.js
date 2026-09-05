import { Router } from 'express';
import { createEnquiry, getEnquiryByRequestId } from '../controllers/enquiries.controller.js';
import { validateBody } from '../middleware/validate.js';
import { enquirySchema } from '../utils/schemas.js';
import { enquiryLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.post('/enquiries', enquiryLimiter, validateBody(enquirySchema), createEnquiry);
router.get('/enquiries/:requestId', getEnquiryByRequestId);

export default router;
