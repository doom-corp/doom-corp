require("dotenv").config();

const mjmlUtils = require("mjml-utils");
const transporter = require("./transporter");
const path = require("path");
const pathToHtmlEmailTemplate = path.join(
  __dirname,
  "./mail_templates/welcome_mail.html"
);

const urlLocal = process.env.URLLOCAL;
const urlFix = process.env.URLFIX;

const sendPassChangedMail = (to, newUser, from = process.env.MAIL_USER) => {
  let id = newUser._id;
  let email = `<p>Your pathetic password has been changed slug</p>`;

  return mjmlUtils
    .inject(pathToHtmlEmailTemplate, newUser)
    .then(finalTemplate => {
      console.log("FINAL TEMPLATE");
      console.log(finalTemplate);

      return transporter
        .sendMail({
          from: `"Password changed" <${from}>`,
          to,
          subject: "Your password has been changed", // Asunto
          //html: finalTemplate
          html: email
        })
        .then(info => console.log(info));
    });
};
module.exports = sendPassChangedMail;
