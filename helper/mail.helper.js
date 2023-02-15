var nodemailer = require("nodemailer");
const CONFIG = require("../config/data.config");

var mailService = async (to, sub, html) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: CONFIG.email, // Your email id
        pass: CONFIG.password, // Your password
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    let mailOption = {
      from: CONFIG.email, // Your Mail
      to: to,
      subject: sub,
      html: html,
    };
    transporter.sendMail(mailOption, async (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message sent:%s", info.accepted);
      console.log("Preview URL:%s", nodemailer.getTestMessageUrl(info));
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.mailService = mailService;