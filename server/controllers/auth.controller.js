import User from '../models/User.js';
import { signToken, setAuthCookie, clearAuthCookie } from '../utils/token.js';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

// POST /api/v1/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Same generic error whether the email doesn't exist or the password is wrong —
    // never reveal which one it was.
    const genericError = { error: { code: 'UNAUTHORIZED', message: 'Invalid email or password.' } };

    if (!user || user.status !== 'active') {
      return res.status(401).json(genericError);
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res.status(423).json({
        error: { code: 'ACCOUNT_LOCKED', message: 'Too many failed attempts. Try again later.' },
      });
    }

    const valid = await user.comparePassword(password);

    if (!valid) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        user.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
        user.failedLoginAttempts = 0;
      }
      await user.save();
      return res.status(401).json(genericError);
    }

    user.failedLoginAttempts = 0;
    user.lockedUntil = undefined;
    await user.save();

    const token = signToken(user);
    setAuthCookie(res, token);

    res.json({
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/auth/logout
export function logout(req, res) {
  clearAuthCookie(res);
  res.status(204).send();
}

// GET /api/v1/auth/me — lets the frontend check "am I still logged in" on load.
export function me(req, res) {
  res.json({
    data: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role },
  });
}
