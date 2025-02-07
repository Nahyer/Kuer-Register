import nodemailer from "nodemailer"
import { registrationConfirmationEmail } from "./emailTemplates"

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_ZEPTOMAIL_SMTP_HOST as string,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_ZEPTOMAIL_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_ZEPTOMAIL_SMTP_STRP,
  },
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: "noreply@kuer.co.ke",
    to,
    subject,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Email sending failed:", error)
    throw new Error("Unable to send email")
  }
}

export const sendConfirmationEmail = async (to: string, name: string, gameName: string) => {
  const subject = "KUER Registration Confirmation"
  const html = registrationConfirmationEmail(name, gameName, new Date())
  await sendEmail(to, subject, html)
}
