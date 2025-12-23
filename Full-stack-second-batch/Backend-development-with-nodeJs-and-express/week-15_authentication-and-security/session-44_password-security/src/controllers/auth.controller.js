import { AppError } from '../errors/app-error.js';
import { login } from '../services/auth.service.js';
import { decodeToken } from '../utils/jwt.util.js';

export async function postLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (!result) throw new AppError(401, 'Invalid credentials');

    const fifteenMinutesMs = 15 * 60 * 1000;
    const cookieMaxAge = Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE_MS || fifteenMinutesMs);
    const secure = process.env.NODE_ENV === 'production';
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      maxAge: cookieMaxAge,
    });

    res.json({
      message: 'Authenticated',
      topic: 'JWT Authentication',
      tokens: {
        accessToken: result.accessToken,
      },
      user: result.user,
    });
  } catch (e) {
    next(e);
  }
}

export async function getTokenStructure(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const decoded = token ? decodeToken(token) : null;
  res.json({
    topic: 'JWT token structure',
    description: 'Header.Payload.Signature (Base64Url)',
    example: decoded || 'Provide a Bearer access token to inspect structure.'
  });
}

export async function postLogout(req, res) {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  res.json({message: 'Logged out, cookie cleared'})

}
