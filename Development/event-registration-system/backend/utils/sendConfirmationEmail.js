const { Resend } = require('resend');

async function sendConfirmationEmail(registration, event) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // ✅ Log the email you're about to send to
  console.log("📨 Sending to:", registration.email);

  // // ✅ Use fallback email for testing mode
  const toEmail ='mtjiff@gmail.com'; // ✅ Your verified Gmail


  try {
    const response = await resend.emails.send({
      from: 'Event Team <onboarding@resend.dev>',
      to: toEmail,

      subject: `You're Registered for ${event.title}!`,
      html: `
        <h2>✅ Registration Successful!</h2>
        <p><strong>Name:</strong> ${registration.name}</p>
        <p><strong>Event:</strong> ${event.title}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>We're excited to see you there!</p>
      `
    });

    console.log("📧 Email sent via Resend:", response);
  } catch (error) {
    console.error("❌ Resend email error:", error.message);
  }
}

module.exports = sendConfirmationEmail;