import { AppError } from '../errors/app-error.js';
import { verifyAccessToken } from '../utils/jwt.util.js';

// Authentication vs Authorization demonstration
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError(401, 'Missing or invalid Authorization header'));
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = verifyAccessToken(token);
    req.user = payload; // authenticated principal
    next();
  } catch (e) {
    next(new AppError(401, 'Invalid or expired access token'));
  }
}

export function authorize(role) {
  return (req, res, next) => {
    console.log('in the auth middleware')
    if (!req.user) return next(new AppError(401, 'Not authenticated'));
    if (role && req.user.role !== role) {
      return next(new AppError(403, 'Forbidden: insufficient privileges'));
    }
    next();
  };
}
