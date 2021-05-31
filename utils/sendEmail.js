const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d6b77dc6deb8e5",
      pass: "2582c20b002123",
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport(smtpPool({
//   service: 'gmail',
//   auth: {
//     user: 'google email',
//     pass: 'email password'
//   },
//   maxConnections: 5,
//   maxMessages: 10
// }));

// const message = {
//   from: `google email`,
//   to: 'arc.ar602@gmail.com',
//   subject: options.subject,
//   text: options.message
// };

// // send mail with defined transport object
// let info = await transporter.sendMail(message);

// console.log("Message sent: %s", info.messageId);
