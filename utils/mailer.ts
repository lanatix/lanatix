import { createTransport } from "nodemailer";
import { ticketTemplate } from "./templates/ticket.template";

const { SMTP_HOST, SMTP_USER, SMTP_PORT, SMTP_PASS }: any = process.env;

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendTicketEmail = async (to: string, img: string, eventName: string) => {
  await transporter.sendMail({
    from: '"Lanatix" <my.lanatix@gmail.com>',
    to,
    subject: `Your Event QR Code Ticket 🎟️ - ${eventName}`,
    html: ticketTemplate(img, eventName),
  });
};
