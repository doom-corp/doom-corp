require("dotenv").config();

const mjmlUtils = require("mjml-utils");
const transporter = require("./transporter");
const path = require("path");
const pathToHtmlEmailTemplate = path.join(
  __dirname,
  "./mail_templates/welcome_mail.html"
);

const sendRequestAccessMail = (to, data, from = process.env.MAIL_USER) => {
  let id = data.newUser._id;
  let email = `<p>Hated ${data.newUser.username}:</p>
              <p>Your credentials to access Doom Corp Intranet are:</p>
              <ul>
                <li>Username: ${data.newUser.username}</li>
                <li>Password: ${data.password}</li>
              </ul>`;

  return mjmlUtils
    .inject(pathToHtmlEmailTemplate, data.newUser)
    .then(finalTemplate => {
      console.log("FINAL TEMPLATE");
      console.log(finalTemplate);

      return transporter
        .sendMail({
          from: `"Request for access" <${from}>`,
          to,
          subject: "New user requests access", // Asunto
          //html: finalTemplate
          html: email
        })
        .then(info => console.log(info));
    });
};
module.exports = sendRequestAccessMail;
