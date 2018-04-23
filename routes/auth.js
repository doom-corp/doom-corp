const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary.js");
const sendRequestAccessMail = require("../mail/sendRequestAccessMail");
const sendAccessGrantedMail = require("../mail/sendAccessGrantedMail");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const imgPath = req.file.url;
  const deathDate = req.body.deathDate;
  const rol = req.body.role;

  if (username === "" || email === "") {
    res.render("auth/signup", { message: "Fill all fields slug" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const newUser = new User({
      username: username,
      email: email,
      profilePic: imgPath,
      deathDate: deathDate,
      role: rol
    });

    newUser.save(err => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" + err });
      } else {
        
        sendRequestAccessMail("doctormaligno.doom.corp@gmail.com", newUser)
          .then(() => {
            console.log("-----------------> REQUEST ACCESS EMAIL SENT!");
            req.flash("info", "MENSAJE ENVIADO");
            res.redirect("/");
          })
          .catch(error => {
            req.flash("info", "ERROR, NO SE HA PODIDO ENVIAR EL MENSAJE");
            next(error);
          });
      }
    });
  });
});

authRoutes.get("/grantAccess/:id", (req, res, next) => {
  let newPass =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashNewPass = bcrypt.hashSync(newPass, salt);

  User.findByIdAndUpdate(req.params.id, {password: hashNewPass}, {new: true})
    .then(newUser => {

      const data = {
        password: newPass,
        newUser: newUser
      }

      sendAccessGrantedMail(newUser.email, data)
        .then(() => {
          console.log("-----------------> ACCESS GRANTED EMAIL SENT!");
          req.flash("info", "MENSAJE ENVIADO");
          res.redirect("/");
        })
        .catch(error => {
          req.flash("info", "ERROR, NO SE HA PODIDO ENVIAR EL MENSAJE");
          next(error);
        });
    })
    .catch(err => console.log("Error updating new user password: " + err))
});

authRoutes.get("/denyAccess/:id");

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
