import Service from '../models/Service.js';
import AuditLog from '../models/AuditLog.js';

// GET /api/v1/admin/services — admin sees everything, including inactive services.
export async function listAllServices(req, res, next) {
  try {
    const services = await Service.find().populate('category', 'name slug').sort({ createdAt: -1 }).lean();
    res.json({ data: services });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/admin/services
export async function createService(req, res, next) {
  try {
    const service = await Service.create(req.body);

    await AuditLog.create({
      userId: req.user._id,
      action: 'service.create',
      entity: 'Service',
      entityId: service._id,
      ipAddress: req.ip,
    });

    res.status(201).json({ data: service });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/admin/services/:id
export async function updateService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found.' } });
    }

    await AuditLog.create({
      userId: req.user._id,
      action: 'service.update',
      entity: 'Service',
      entityId: service._id,
      metadata: { fields: Object.keys(req.body) },
      ipAddress: req.ip,
    });

    res.json({ data: service });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/v1/admin/services/:id — archive rather than hard-delete, since
// past enquiries may reference this service (Architecture doc section 8.3).
export async function archiveService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

    if (!service) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found.' } });
    }

    await AuditLog.create({
      userId: req.user._id,
      action: 'service.archive',
      entity: 'Service',
      entityId: service._id,
      ipAddress: req.ip,
    });

    res.json({ data: service });
  } catch (err) {
    next(err);
  }
}
