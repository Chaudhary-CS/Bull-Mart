const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  // Check if we're in development mode and email config is not set up
  if (process.env.NODE_ENV === "development" && !process.env.SMPT_MAIL) {
    console.log("📧 Development Mode: Email would be sent to:", options.email);
    console.log("📧 Subject:", options.subject);
    console.log("📧 Message:", options.message);
    console.log("📧 Note: Set up SMTP configuration in config/.env for actual email sending");
    return Promise.resolve(); // Resolve without actually sending email
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
