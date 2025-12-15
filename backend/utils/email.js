// utils/email.js
import nodemailer from 'nodemailer'

export const sendEmail = async ({ to, subject, text, html }) => {
  // Example using Gmail (or use any SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS // app password
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent to', to)
  } catch (err) {
    console.error('Email failed:', err)
  }
}
