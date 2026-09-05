import jwt from 'jsonwebtoken';

export function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// AUTH-03: sessions expire per policy and are invalidated on logout.
// SEC-07: cookie is httpOnly + sameSite to reduce CSRF/XSS token theft risk.
export function setAuthCookie(res, token) {
  res.cookie(process.env.COOKIE_NAME || 'sg_admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(process.env.COOKIE_NAME || 'sg_admin_token', { path: '/' });
}
