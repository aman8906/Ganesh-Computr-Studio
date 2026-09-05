import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// AUTH-04 / SEC-03: every protected API operation verifies the authenticated
// user's role/permission server-side — never trust the frontend alone.
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[process.env.COOKIE_NAME || 'sg_admin_token'];

    if (!token) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Login required.' } });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub).select('-passwordHash');

    if (!user || user.status !== 'active') {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Session is no longer valid.' } });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired session.' } });
  }
}

// AUTH-06: admin-only endpoints reject any role that isn't 'admin' with 403.
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'You do not have permission to do this.' } });
    }
    next();
  };
}
