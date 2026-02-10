import { AppError } from '../errors/app-error.js';
import { login } from '../services/auth.service.js';
import { decodeToken } from '../utils/jwt.util.js';

export async function postLogin(req, res, next) {
  try {
    const {username, password} = req.body;
    const result = await login(username, password);

    if (!result){
       throw new AppError(401, "Unauthorized access")
    }
    const fifteenMinutesMs = 15 * 60 * 1000;
    const cookieMaxAge = Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE_MS)

    const secure = process.env.NODE_ENV === "production"

    res.cookie("access_token", result.accessToken)
  } catch (e) {
    next(e);
  }
}

export async function getTokenStructure(req, res) {
}

export async function postLogout(req, res) {
}
