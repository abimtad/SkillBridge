import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.authEmail,
    pass: env.authPassword,
  },
});