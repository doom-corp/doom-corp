require("dotenv").config();

const mjmlUtils = require("mjml-utils");
const transporter = require("./transporter");
const path = require("path");
const pathToHtmlEmailTemplate = path.join(
  __dirname,
  "./mail_templates/welcome_mail.html"
);

const sendAccessDenied = (to, newUser, from = process.env.MAIL_USER) => {
  let id = newUser._id;
  let email = `<p>Hated ${newUser.username}:</p>
              <p>You are not allowed to access Dom Corp. Check your sins and be as much evil as you can!</p>`;

  return mjmlUtils
    .inject(pathToHtmlEmailTemplate, newUser)
    .then(finalTemplate => {
      console.log("FINAL TEMPLATE");
      console.log(finalTemplate);

      return transporter
        .sendMail({
          from: `"Access Denied" <${from}>`,
          to,
          subject: "Your access has been denied", // Asunto
          //html: finalTemplate
          html: email
        })
        .then(info => console.log(info));
    });
};
module.exports = sendAccessDenied;
