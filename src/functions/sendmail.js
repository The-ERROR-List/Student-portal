"use strict";
const nodemailer = require("nodemailer");

module.exports = (firstName, username, password, email) => {
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
<b>Welcome to our elearning platform</b>
<p>We are happy to have you ${firstName} with us <br>
The following are your credentials: <br>
username: ${username} <br>
password: ${password}
</p>

`;

  let options = {
    from: "elearning-server-project@outlook.com", // sender address
    to: email, // list of receivers
    subject: "Welcome to our elearning platform", // Subject line
    text: "Hello world?", // plain text body
    html: htmltext, // html body
  };

  transporter.sendMail(options);
};
