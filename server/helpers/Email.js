import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_ADDRESS,
    pass: GMAIL_APP_PASSWORD
  }
});

const send = (message) => {
    const mailOptions = {
        from: GMAIL_ADDRESS,
        to: message.to,
        subject: message.subject,
        html: message.html
    };

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

export {
  send,
} 