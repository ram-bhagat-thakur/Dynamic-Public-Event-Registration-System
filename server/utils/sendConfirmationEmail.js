const nodemailer = require('nodemailer');

// Retry helper for transient failures
const retry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

const sendConfirmationEmail = async ({ name, email, eventTitle, eventDate, message, time, location }) => {
  try {
    // Create transporter with explicit Gmail SMTP config
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS, // App password
      },
      tls: {
        rejectUnauthorized: false, // Optional fallback
      },
    });

    // Email content
    const mailOptions = {
      from: `"Event Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Registration Confirmation for ${eventTitle}`,
      html: `
        <h2 style="color:#2c3e50;">Hello ${name},</h2>
        <p style="font-size:16px;">
          We're thrilled to have you join us for <strong>${eventTitle}</strong> happening on <em>${eventDate}</em>! 🎉
        </p>
        <p style="font-size:15px;">Here’s how to make the most of your event experience:</p>
        <ul style="font-size:15px;">
          <li>📅 Date: <strong>${eventDate}</strong></li>
          <li>⏰ Time: <strong>${time}</strong></li>
          <li>📍 Location: <strong>${location}</strong></li>
          <li>🙋‍♂️ Arrive with curiosity and enthusiasm!</li>
        </ul>
        ${message ? `<p style="font-size:15px;">Additional note you shared with us: <em>${message}</em><br>Thanks for that!</p>` : ''}
        <p style="margin-top:20px;">
          🔎 If you have questions before the event, check our 
          <a href="https://dynamic-public-event-registration-system.onrender.com/#faq" style="color:#007bff;">Frequently Asked Questions</a>.
        </p>
        <p style="font-size:15px;">Learn more or get updates via:</p>
        <ul style="font-size:15px;">
          <li>🌐 Website: <a href="https://dynamic-public-event-registration-system.onrender.com/" style="color:#007bff;">Visit Platform</a></li>
          <li>🔗 LinkedIn: <a href="https://www.linkedin.com/company/sect-india/" style="color:#007bff;">SECT India</a></li>
          <li>📘 Facebook: <a href="http://www.facebook.com/" style="color:#007bff;">Like Us</a></li>
          <li>📸 Instagram: <a href="https://instagram.com/" style="color:#007bff;">Follow Our Journey</a></li>
        </ul>
        <p style="margin-top:30px;">
          We'll send a reminder as the date approaches. If you have any questions or accessibility needs, don’t hesitate to reach out.
        </p>
        <p style="margin-top:20px;">
          Warm regards,<br /><strong>Event Team</strong>
        </p>
      `,
    };

    // Send email with retry logic
    await retry(() => transporter.sendMail(mailOptions));

    console.log('✅ Confirmation email sent to:', email);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
  }
};

module.exports = sendConfirmationEmail;