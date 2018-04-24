const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

const ensureLoggedIn = require("../middlewares/ensureLoggedIn");

/* GET user profile */
router.get("/", ensureLoggedIn("/"), (req, res, next) => {
  res.render("user/profile", { user: req.user });
});

module.exports = router;