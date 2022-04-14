"use strict";
const nodemailer = require("nodemailer");

module.exports = (email) => {
  // To send emails you need a transporter object
  //transporter is going to be an object that is able to send mail

  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "elearning-server-project@outlook.com",
      pass: "oOP09*33fg",
    },
  }); // takes an object that defines default values for mail options
  //You have to create the transporter object only once. If you already have a transporter object you can use it to send mail as much as you like.

  let htmltext = `
<p>please enter your new password <br>
password: ${password} <br>
confirm your password: ${password}
</p>

`;

  let options = {
    from: "elearning-server-project@outlook.com", // sender address
    to: email, // list of receivers
    subject: "Reset your password", // Subject line
    html: htmltext, // html body
  };

  transporter.sendMail(options);
};
