import { AppError } from '../errors/app-error.js';
import { verifyAccessToken } from '../utils/jwt.util.js';

// Authentication vs Authorization demonstration
export function authenticate(req, res, next) {
}

export function authorize(role) {
}
