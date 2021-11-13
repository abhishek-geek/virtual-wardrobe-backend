const nodemailer = require("nodemailer");
const {
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
  MAIL_USERNAME,
  MAIL_PASSWORD,
} = require("./config");

console.log("id: ", MAIL_USERNAME);
console.log("pass: ", MAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
    clientId: MAIL_CLIENT_ID,
    clientSecret: MAIL_CLIENT_SECRET,
    refreshToken: MAIL_REFRESH_TOKEN,
  },
});

const mailOptions = {
  from: "mailbuzz62@gmail.com",
  to: "2019005@iiitdmj.ac.in",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log("shit", error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

const send = (mails) => {
  console.log("LEN: ", mails.length);
  if (mails.length == 0) return;
  mails.forEach((mail) => {
    console.log(mail);
    const mailOptions = {
      from: "mailbuzz62@gmail.com",
      to: mail.to,
      cc: mail.cc,
      bcc: mail.bcc,
      subject: mail.subject,
      text: mail.body,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("shit", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log("mailOptions", mailOptions);
  });
};

module.exports = {
  send,
};
