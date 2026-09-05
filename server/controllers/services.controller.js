import Service from '../models/Service.js';
import ServiceCategory from '../models/ServiceCategory.js';

// GET /api/v1/services — SRS FR-SVC-01/02/04: active services only, grouped by category.
export async function listServices(req, res, next) {
  try {
    const { category, q } = req.query;
    const filter = { isActive: true };

    if (category) {
      const cat = await ServiceCategory.findOne({ slug: category, active: true });
      if (!cat) return res.json({ data: [] });
      filter.category = cat._id;
    }

    if (q) {
      filter.$text = { $search: q };
    }

    const services = await Service.find(filter)
      .populate('category', 'name slug')
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    res.json({ data: services });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/services/:slug
export async function getServiceBySlug(req, res, next) {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug')
      .lean();

    if (!service) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service not found.' } });
    }

    res.json({ data: service });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/categories
export async function listCategories(req, res, next) {
  try {
    const categories = await ServiceCategory.find({ active: true }).sort({ sortOrder: 1, name: 1 }).lean();
    res.json({ data: categories });
  } catch (err) {
    next(err);
  }
}
