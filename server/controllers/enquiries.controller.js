import Enquiry from '../models/Enquiry.js';
import Service from '../models/Service.js';
import AuditLog from '../models/AuditLog.js';
import { generateRequestId } from '../utils/requestId.js';

// POST /api/v1/enquiries — SRS FR-ENQ-02: create only after all validation passes.
export async function createEnquiry(req, res, next) {
  try {
    const { name, phone, service, message } = req.body;

    let serviceDoc = null;
    let serviceLabel = 'Other';

    if (service && service !== 'other') {
      // SRS VAL-03 / AC-10: service must match an approved, currently active service,
      // or fall through to the explicit "Other" option — never trust a raw client value.
      serviceDoc = await Service.findOne({ slug: service, isActive: true });
      if (!serviceDoc) {
        const err = new Error('Selected service is no longer available. Please choose another.');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
      }
      serviceLabel = serviceDoc.name;
    }

    // Retry a couple of times on the astronomically unlikely event of a requestId collision.
    let requestId;
    for (let attempt = 0; attempt < 3; attempt++) {
      const candidate = generateRequestId();
      const exists = await Enquiry.exists({ requestId: candidate });
      if (!exists) {
        requestId = candidate;
        break;
      }
    }
    if (!requestId) requestId = generateRequestId() + Date.now().toString().slice(-3);

    const enquiry = await Enquiry.create({
      requestId,
      name,
      phone,
      service: serviceDoc?._id,
      serviceLabel,
      message: message || '',
      status: 'New', // BR-03
      ip: req.ip,
    });

    res.status(201).json({
      data: {
        id: enquiry._id,
        requestId: enquiry.requestId,
        status: enquiry.status,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/enquiries/:requestId — lets a customer check their own request status
// without an account, using the ID they were given at submission time.
export async function getEnquiryByRequestId(req, res, next) {
  try {
    const enquiry = await Enquiry.findOne({ requestId: req.params.requestId })
      .select('requestId name status serviceLabel createdAt') // never expose internal notes to public users
      .lean();

    if (!enquiry) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Request not found.' } });
    }

    res.json({ data: enquiry });
  } catch (err) {
    next(err);
  }
}

// ---- Admin ----

// GET /api/v1/admin/enquiries
export async function listAdminEnquiries(req, res, next) {
  try {
    const { status, page = 1, limit = 20, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { requestId: { $regex: q, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

    const [items, total] = await Promise.all([
      Enquiry.find(filter)
        .populate('service', 'name slug')
        .populate('assignedTo', 'name')
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    res.json({
      data: items,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/admin/enquiries/:id
export async function getAdminEnquiry(req, res, next) {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('service', 'name slug')
      .populate('assignedTo', 'name')
      .populate('notes.author', 'name')
      .lean();

    if (!enquiry) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Enquiry not found.' } });
    }

    res.json({ data: enquiry });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/admin/enquiries/:id — BR-05: only authorized staff/admin can change status.
export async function updateEnquiryStatus(req, res, next) {
  try {
    const { status, note } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Enquiry not found.' } });
    }

    const previousStatus = enquiry.status;
    enquiry.status = status;
    if (note) {
      enquiry.notes.push({ text: note, author: req.user._id });
    }
    await enquiry.save();

    await AuditLog.create({
      userId: req.user._id,
      action: 'enquiry.status_update',
      entity: 'Enquiry',
      entityId: enquiry._id,
      metadata: { from: previousStatus, to: status },
      ipAddress: req.ip,
    });

    res.json({ data: enquiry });
  } catch (err) {
    next(err);
  }
}
