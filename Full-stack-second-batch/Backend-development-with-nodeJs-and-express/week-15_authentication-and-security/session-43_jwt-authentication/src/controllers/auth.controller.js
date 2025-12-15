import { AppError } from '../errors/app-error.js';
import { login } from '../services/auth.service.js';
import { decodeToken } from '../utils/jwt.util.js';

export async function postLogin(req, res, next) {
  try {
  } catch (e) {
    next(e);
  }
}

export async function getTokenStructure(req, res) {
}

export async function postLogout(req, res) {
}
