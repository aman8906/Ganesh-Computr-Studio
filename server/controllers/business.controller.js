import Business from '../models/Business.js';

// GET /api/v1/business — public, used to render contact/footer info.
export async function getBusiness(req, res, next) {
  try {
    const business = await Business.findOne().lean();
    if (!business) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Business profile not configured yet.' } });
    }
    res.json({ data: business });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/admin/business — ADM-05: only authorized admin can update.
export async function updateBusiness(req, res, next) {
  try {
    const business = await Business.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json({ data: business });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/admin/reports/summary — simple operational dashboard numbers.
export async function getReportSummary(req, res, next) {
  try {
    const Enquiry = (await import('../models/Enquiry.js')).default;
    const Service = (await import('../models/Service.js')).default;

    const [statusCounts, activeServices, totalEnquiries] = await Promise.all([
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Service.countDocuments({ isActive: true }),
      Enquiry.countDocuments(),
    ]);

    const byStatus = Object.fromEntries(statusCounts.map((s) => [s._id, s.count]));

    res.json({
      data: {
        totalEnquiries,
        activeServices,
        byStatus,
      },
    });
  } catch (err) {
    next(err);
  }
}
