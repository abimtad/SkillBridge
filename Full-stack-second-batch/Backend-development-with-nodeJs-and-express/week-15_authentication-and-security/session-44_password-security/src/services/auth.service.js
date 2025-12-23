import { db } from '../lib/db.js';
import { signAccessToken } from '../utils/jwt.util.js';
import bcrypt from 'bcrypt';
import { findByUsername } from './user.service.js';
import { AppError } from '../errors/app-error.js';

export async function login(username, password) {
  await db.read();
  const user = await findByUsername(username);
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const accessToken = signAccessToken({ sub: user.id, username: user.username, role: user.role });

  return { accessToken, user: { id: user.id, username: user.username, role: user.role } };
}
