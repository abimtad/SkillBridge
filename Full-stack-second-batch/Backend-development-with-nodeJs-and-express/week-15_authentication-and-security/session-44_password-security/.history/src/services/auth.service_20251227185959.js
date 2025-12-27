import { db } from '../lib/db.js';
import { signAccessToken } from '../utils/jwt.util.js';
import bcrypt from 'bcrypt';
import { findByUsername } from './user.service.js';
import { AppError } from '../errors/app-error.js';
import crypto from 'crypto';
import { sendVerificationEmail } from '../lib/nodeMail/email.js';

export async function signup(name, username, email, password) {
  await db.read();
  const existingUser = await findByUsername(username);
  if (existingUser) {
    throw new AppError(409, 'User already exists');
  }
  const existingEmail = db.data.users.find((u) => u.email === email);
  if (existingEmail) {
    throw new AppError(409, 'Email already in use');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("verification token:", verificationToken);

  const newUser = {
    id: db.data.users.length + 1,
    name,
    username,
    email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    role: 'user',
  };

  db.data.users.push(newUser);
  await db.write();
  await sendVerificationEmail(newUser.email, verificationToken);
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return next(errorHandler(400, "Invalid or expired verification code"));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

  return { user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role } };
}

export async function login(username, password) {
  await db.read();
  const user = await findByUsername(username);
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const accessToken = signAccessToken({ sub: user.id, username: user.username, role: user.role });

  return { accessToken, user: { id: user.id, username: user.username, role: user.role } };
}

export async function forgotPassword(email) {
    await db.read();
    const user = db.data.users.find((u) => u.email === email);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
  
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
    await db.write();
  
    // In a real app, you'd send an email with the resetToken
    console.log(`Password reset token for ${email}: ${resetToken}`);
  
    return {
      message: 'Password reset token generated. It will expire in 1 hour.',
      token: resetToken,
    };
  }
  
  export async function resetPassword(token, password) {
    await db.read();
    const user = db.data.users.find(
      (u) => u.resetPasswordToken === token && u.resetPasswordExpires > Date.now()
    );
  
    if (!user) {
      throw new AppError(400, 'Password reset token is invalid or has expired');
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
  
    await db.write();
  
    return { message: 'Password has been reset' };
  }


export async function verify(verificationCode) {
    await db.read()

    const user = await db.data.users.find( (u) =>{
      u.verificationToken === verificationCode &&
      u.verificationTokenExpiresAt  > Date.now()
    });

    if (!user) {
      throw  new AppError(400, "Invalid or expired verification code");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.write();

    await sendWelcomeEmail(user.email, user.name);
}