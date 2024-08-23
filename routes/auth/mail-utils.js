import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravibalajiips@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

const mailOptions = {
  from: "ravibalajiips@gmail.com",
  to: ["ravibalajinr@gmail.com"],
  subject: "Email Testing",
  text: "Sending mails are so easy",
};

export { mailOptions, transporter };
