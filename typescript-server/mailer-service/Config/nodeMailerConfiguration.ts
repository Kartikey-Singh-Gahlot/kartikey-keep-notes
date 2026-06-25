import "dotenv/config";
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";


export const transporter = nodemailer.createTransport({
  host: process.env.MAILER_SMTP_HOST || '',
  port: process.env.MAILER_SMTP_PORT || 465,
  family: 4,
  secure: true,
  auth: {
    user: process.env.MAILER_SMTP_USER || '',
    pass: process.env.MAILER_SMTP_PASS || ''
  }
} as SMTPTransport.Options);


transporter.verify((err:any) => {
  if (err) {
    console.error("SMTP VERIFY FAILED");
    console.error(err);
  } else {
    console.log("SMTP READY");
  }
});
