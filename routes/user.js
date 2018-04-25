const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const sendPassChangedMail = require("../mail/sendPassChangedMail");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* GET user profile */
router.get("/", ensureLoggedIn("/"), (req, res, next) => {
  res.render("user/profile", { user: req.user });
});

router.post("/changepass", ensureLoggedIn("/"),(req, res, next) => {
  let currentPass = req.body.currentpass;
  let newPass = req.body.newpass;

  User.findById(req.user._id)
    .then(user => {
      if (!bcrypt.compareSync(currentPass, user.password)) {
        res.render("user/profile", {
          message: "Your current password doesn't match"
        });
        return;
      }

      salt = bcrypt.genSaltSync(bcryptSalt);
      const newPassHash = bcrypt.hashSync(newPass, salt);

      User.findByIdAndUpdate(
        req.user._id,
        { password: newPassHash },
        { new: true }
      )
        .then((user) => {
          sendPassChangedMail(user.email, user)
            .then(() => {
              console.log("-----------------> REQUEST ACCESS EMAIL SENT!");
              req.flash("info", "MENSAJE ENVIADO");
              res.render("user/profile", {
                message: "Password updated"
              });
            })
            .catch(error => {
              req.flash("info", "ERROR, NO SE HA PODIDO ENVIAR EL MENSAJE");
              next(error);
            });
        })
        .catch(err => {
          console.log("Error updating user password: " + err);
          res.render("user/profile", { message: "Error updating password" });
        });
    })
    .catch(err => console.log("User not found:" + err));
});

router.get("/pdf")


module.exports = router;