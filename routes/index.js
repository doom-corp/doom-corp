const express = require('express');
const router  = express.Router();
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});


/* GET dashboard */
router.get("/dashboard", ensureLoggedIn("/"), (req, res, next) => {
  res.render("dashboard", { user: req.user });
})

/*POST attack*/ 
router.get("/attack", ensureLoggedIn("/"), (req, res, next) => {
  
  //res.render("dashboard", { user: req.user });
})


module.exports = router;
