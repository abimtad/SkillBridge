import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.authEmail,
    pass: authPassword,
  },
});