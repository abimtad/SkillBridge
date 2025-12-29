import { AppError } from '../errors/app-error.js';
import { login, signup, forgotPassword, resetPassword, verify } from '../services/auth.service.js';
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

export async function postSignup(req, res, next) {
  try {
    const { name, username, email, password } = req.body;
    const result = await signup(name, username, email, password);
    res.status(201).json({
      message: 'User created',
      user: result.user,
    });
  } catch (e) {
    next(e);
  }
}

export async function postForgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const response = await forgotPassword(email);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
  
  export async function postResetPassword(req, res, next) {
    try {
      const { password } = req.body;
      const token = req.query.token;
      await resetPassword(token, password);
      res.json({ message: 'Password has been reset' });
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

export const verifyEmail = async (req, res, next) => {
  const { code } = req.body;
  console.log("code: ", code, ' ' , "code after casted: ", Number(code))
  try {
    const user = await verify(code)
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      ...user
    });
  } catch (error) {
    next(error);
  }
};