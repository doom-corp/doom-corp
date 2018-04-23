require("dotenv").config();

const mjmlUtils = require("mjml-utils");
const transporter = require("./transporter");
const path = require("path");
const pathToHtmlEmailTemplate = path.join(
  __dirname,
  "./mail_templates/welcome_mail.html"
);
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
let newPass = Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

/* const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(newPass, salt);
 */
const sendRequestAccessMail = (to, newUser, from = process.env.MAIL_USER) => {

  let id = newUser._id;
  console.log(newUser)
  let email = `<a href="/auth/granAccess">Grant access</a><br><br><a href="/auth/denyAccess">Deny access</a>`;

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
        .then(info => console.log(info));
    });
};
module.exports = sendRequestAccessMail;
