import nodemailer from "nodemailer";
import {env} from  "../../config/index.js"

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.authEmail,
    pass: env.authPassword,
  },
});