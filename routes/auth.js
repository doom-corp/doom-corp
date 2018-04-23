const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary.js");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

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

    /* const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt); */

    const newUser = new User({
      username: username,
      email: email,
      profilePic: imgPath,
      deathDate: deathDate,
      role: rol
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" + err});
      } else {
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
