import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});