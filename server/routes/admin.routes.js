import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { enquiryStatusSchema, serviceSchema } from '../utils/schemas.js';

import {
  listAdminEnquiries,
  getAdminEnquiry,
  updateEnquiryStatus,
} from '../controllers/enquiries.controller.js';

import {
  listAllServices,
  createService,
  updateService,
  archiveService,
} from '../controllers/admin.services.controller.js';

import { updateBusiness, getReportSummary } from '../controllers/business.controller.js';

const router = Router();

// Everything below requires a valid session (AUTH-06 / SEC-03).
router.use(requireAuth);

// Enquiries — staff and admin can both view/update.
router.get('/admin/enquiries', requireRole('staff', 'admin'), listAdminEnquiries);
router.get('/admin/enquiries/:id', requireRole('staff', 'admin'), getAdminEnquiry);
router.patch(
  '/admin/enquiries/:id',
  requireRole('staff', 'admin'),
  validateBody(enquiryStatusSchema),
  updateEnquiryStatus
);

// Services — only admin can create/edit/archive (BR: "only authorized roles").
router.get('/admin/services', requireRole('staff', 'admin'), listAllServices);
router.post('/admin/services', requireRole('admin'), validateBody(serviceSchema), createService);
router.patch('/admin/services/:id', requireRole('admin'), updateService);
router.delete('/admin/services/:id', requireRole('admin'), archiveService);

// Business settings — admin only.
router.patch('/admin/business', requireRole('admin'), updateBusiness);

// Reports — read-only dashboard numbers.
router.get('/admin/reports/summary', requireRole('staff', 'admin'), getReportSummary);

export default router;
