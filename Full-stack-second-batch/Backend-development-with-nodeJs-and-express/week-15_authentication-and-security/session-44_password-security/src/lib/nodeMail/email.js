import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailer } from "./mailer.js";
import { WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    await mailer.sendMail({
      from: { name: "Abel", address: env.authEmail },
      to: email,
      subject: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
  } catch (error) {
    console.log("Failed to send email Verification", error);
    throw new Error("Error sending verification Email", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    await mailer.sendMail({
      from: { name: "Abel", address: env.authEmail },
      to: email,
      subject: "Welcome",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    });
  } catch (error) {
    console.log("Failed to send welcome email", error);
    throw new Error("Error sending welcome email", error);
  }
};

export const sendForgotPasswordEmail = async (email, resetUrl, next) => {
  try {
    await mailer.sendMail({
      from: { name: "Abel", address: env.authEmail },
      to: email,
      subject: "Forgot Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    });
  } catch (error) {
    next(error);
  }
};

export const sendPasswordResetSuccessEmail = async (email, next) => {
  try {
    await mailer.sendMail({
      from: { name: "Abel", address: env.authEmail },
      to: email,
      subject: "Successfully reset password !",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (error) {
    next(error);
  }
};