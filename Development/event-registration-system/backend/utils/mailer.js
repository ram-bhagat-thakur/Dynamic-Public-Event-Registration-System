// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,              // ✅ TLS port
//   secure: false,          // ✅ Must be false for port 587
//   requireTLS: true,       // ✅ Enforces TLS
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   },
//   tls: {
//     rejectUnauthorized: false   // ✅ Helps bypass strict certificate checks
//   },
//   connectionTimeout: 30000,     // ✅ 30 seconds
//   greetingTimeout: 10000,
//   socketTimeout: 30000
// });

// module.exports = transporter;