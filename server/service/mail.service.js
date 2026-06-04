import dotenv from "dotenv";
// const dotenv = require("dotenv");
dotenv.config();

// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.APP_PASS,
  },
});


transporter.verify().then(() => {
    console.log('Email server is ready to send messages');
}).catch((error) => {
    console.error('Error connecting to email server:', error);
});

export async function sendEmail({to,subject,text,html}){
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        text,
        html
    }
    const details = await transporter.sendMail(mailOptions);
    return details;
}
