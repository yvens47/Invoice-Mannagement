
const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,

  auth: {
    user: process.env.MAILTRAPUSER ||"76d682b4d81afd", // generated ethereal user
    pass: process.env.MAILTRAPPASS ||"ee4eb37bcaeb46", // generated ethereal password
  },
});

const sendMail = async (from, to, subject, text, html) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${from}`, // sender address
    to: `${to}`, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}
module.exports = sendMail;