import { format } from "date-fns"

export const registrationConfirmationEmail = (name: string, gameName: string, registrationDate: Date) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KUER Registration Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo img {
      max-width: 200px;
    }
    .content {
      background-color: #f9f9f9;
      border-radius: 5px;
      padding: 20px;
    }
    .whatsapp-button {
      display: inline-block;
      background-color: #25D366;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 0.8em;
      color: #666;
    }
    .important-note {
      background-color: #e8f5e9;
      border-left: 4px solid #25D366;
      padding: 10px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="logo">
    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KUER%20transparent-ADWTe637irf50TF7gvZ0Xc3edWtDMY.png" alt="KUER Logo">
  </div>
  <div class="content">
    <h1>Registration Confirmation</h1>
    <p>Hello ${name},</p>
    <p>Thank you for registering for the KUER ${gameName} tournament! Your registration has been successfully received and is being processed.</p>
    <p>Registration details:</p>
    <ul>
      <li><strong>Game:</strong> ${gameName}</li>
      <li><strong>Date:</strong> ${format(registrationDate, "MMMM dd, yyyy")}</li>
    </ul>
    <div class="important-note">
      <p><strong>Important Information About WhatsApp Groups:</strong></p>
      <ol>
        <li>Please join our WhatsApp channel for immediate updates:</li>
        <li>Once your student status is verified, you will receive another email with a link to join the main WhatsApp group for your specific game and tournament.</li>
      </ol>
    </div>
    <p>Join our WhatsApp channel for updates:</p>
    <a href="https://whatsapp.com/channel/0029VafLdwE96H4XI1gb3X3Z" class="whatsapp-button">Join KUER WhatsApp Channel</a>
    <p>If you have any questions or need to update your registration information, please don't hesitate to contact us at info@kuer.co.ke.</p>
    <p>Good luck and game on!</p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} Kenya University Esports Rankings (KUER). All rights reserved.</p>
  </div>
</body>
</html>
`

