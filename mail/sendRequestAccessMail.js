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

const sendRequestAccessMail = (to, newUser, from = process.env.MAIL_USER) => {

  let id = newUser._id;
  let email = `<p> To grant access click here <a href="${urlFix}${urlLocal}/auth/grantAccess/${id}">Grant access</a></p>
              <br><br>
              <p> To deny access click here <a href="${urlFix}${urlLocal}/auth/denyAccess/${id}">Deny access</a></p>`;

  return mjmlUtils
    .inject(pathToHtmlEmailTemplate, newUser)
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
        .then();
    });
};
module.exports = sendRequestAccessMail;
