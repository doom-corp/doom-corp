const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const City = require("../models/City");
const sendPassChangedMail = require("../mail/sendPassChangedMail");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");
const pdfDocument = require("pdfkit");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* GET user profile */
router.get("/", ensureLoggedIn("/"), (req, res, next) => {

  // METER IFS PARA LOS DISTINTOS TIPOS DE USUARIOS
  City.find()
  .then((cities) => {
    // let data = {
    //   user: req.user,
    //   cities
    // }
    res.render("user/profile", { user: req.user, cities: JSON.stringify(cities) });
  })
  
  //let rol = req.user.role;
  
  /* if(rol === "admin"){
    res.render("user/profileAdmin", { user: req.user });
  } */

});

router.post("/changepass", ensureLoggedIn("/"), (req, res, next) => {
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
        .then(user => {
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

router.get("/pdf", (req, res, next) => {
  let doc = new pdfDocument({
    margins: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 40
    }
  });
  doc.pipe(res);

  doc
    // Vertical lines
    .moveTo(40, 20)
    .lineTo(40, 770)
    .moveTo(580, 20)
    .lineTo(580, 770)

    // Horizontal lines
    .moveTo(40, 20) //superior
    .lineTo(580, 20)
    .moveTo(40, 770) // inferior
    .lineTo(580, 770)
    .moveTo(40, 590) // inferior total
    .lineTo(580, 590)
    .moveTo(40, 150) // superior titulo
    .lineTo(580, 150)
    .moveTo(120, 300) // devengos
    .lineTo(500, 300)
    .moveTo(120, 450) // deducciones
    .lineTo(500, 450)

    // Dibujo de las lineas
    .stroke("black", "even-odd");

  // title
  let title = "DOOM CORP";
  doc.fontSize(30);
  doc.fillColor("black");
  doc.text(title, 360, 70);

  // Employee data title
  let text = "Employee data";
  doc.fontSize(16);
  doc.fillColor("black");
  doc.text(text, 50, 40);

  // Employee data content
  doc.fontSize(14);
  text = req.user.username;
  doc.fillColor("black");
  doc.text(text, 50, 60);

  text = req.user.role;
  doc.fillColor("black");
  doc.text(text, 50, 80);

  date = req.user.created_at;
  text = date.toString().substring(4, 15);
  doc.fillColor("black");
  doc.text(text, 50, 100);

  // Employee income title
  text = "Incomes";
  doc.fontSize(16);
  doc.fillColor("black");
  doc.text(text, 50, 180);

  // Employee income content
  text = `incomes €`;
  doc.fontSize(16);
  doc.fillColor("black");
  doc.text(text, 460, 220);

  // Employee tax title
  text = "Taxes";
  doc.fontSize(16);
  doc.fillColor("black");
  doc.text(text, 50, 320);

  // Employee tax content
  text = "140%";
  doc.fontSize(16);
  doc.fillColor("black");
  doc.text(text, 460, 350);

  // Employee total incomes title
  text = "Total incomes";
  doc.fontSize(16);
  doc.fillColor("black");
  doc.text(text, 50, 500);

  // Employee total incomes content
  text = "Yo buddy, u're fucked up XD";
  doc.fontSize(16);
  doc.fillColor("black");
  doc.text(text, 360, 530);

  doc
    .image("public/images/pdf/montoro.png", 170, 590)
    .text("HAHAHA YOU'RE POOR!", 320, 100);

  /* doc.y = 720;
  doc.fillColor("black");
  doc.text(loremIpsum, {
    paragraphGap: 10,
    indent: 20,
    align: "justify",
    columns: 2
  }); */

  doc.end();
});

module.exports = router;