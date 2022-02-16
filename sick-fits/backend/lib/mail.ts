import { createTransport, getTestMessageUrl } from 'nodemailer'

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

function createMail(text: string) {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      font-size: 20px;
    ">
      <h2>Friendly email from SickFits!</h2>
      <p>${text}</p>
      <p>Thanks!</p>
    </div>
  `
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: "Here's your password reset link!",
    html: createMail(
      `<a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}&identity=${to}">Click here</a> to reset your password`
    ),
  })

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`📧 Email sent: ${getTestMessageUrl(info) || ''}`)
  }
}
