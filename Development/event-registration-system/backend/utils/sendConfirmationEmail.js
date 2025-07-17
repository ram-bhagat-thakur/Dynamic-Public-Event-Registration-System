const transporter = require('./mailer');

async function sendConfirmationEmail(registration, event) {
  const mailOptions = {
    from: `"Event Team" <${process.env.SMTP_USER}>`,
    to: registration.email,
    subject: `You're Registered for ${event.title}!`,
    html: `
      <h2>✅ Registration Successful!</h2>
      <p><strong>Name:</strong> ${registration.name}</p>
      <p><strong>Event:</strong> ${event.title}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
}

module.exports = sendConfirmationEmail;