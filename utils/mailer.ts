import { createTransport } from "nodemailer";

const { SMTP_HOST, SMTP_USER, SMTP_PORT, SMTP_PASS }: any = process.env;

const transporter = createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});
