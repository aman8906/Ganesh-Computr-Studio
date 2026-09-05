import rateLimit from 'express-rate-limit';

// SEC-08 / SRS FR-ENQ-06: limit rapid repeated submissions from the same client.
export const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again shortly.' } },
});

// AUTH-05: repeated failed login attempts are rate-limited / temporarily blocked.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many login attempts. Please try again later.' } },
});

// General-purpose light limiter for the rest of the public API.
export const publicApiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
