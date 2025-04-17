const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendToken = async (to, token) => {
  await transporter.sendMail({
    from: `"ePayco Wallet" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Código de Confirmación',
    text: `Tu código es: ${token}`,
  });
};