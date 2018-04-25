const express = require('express');
const router  = express.Router();
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});


/* GET dashboard */
router.get("/dashboard", ensureLoggedIn("/"), (req, res, next) => {
  
  Post.find()
    .sort({ created_at: "descending" })
    .populate('creatorId')
    .then(posts => {
      console.log(posts);
      const data = { user: req.user, posts: posts };
      res.render("dashboard", data);
    })
    .catch(err => `Error finding posts: ${err}`);
})

/*POST attack*/ 
router.get("/attack", ensureLoggedIn("/"), (req, res, next) => {
  
  //res.render("dashboard", { user: req.user });
})


module.exports = router;
