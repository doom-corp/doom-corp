const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");
const uploadCloud = require("../config/cloudinary.js");

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



/* POST new posts */

router.post("/newpost", uploadCloud.single("photo"), (req, res, next) => {
  let content = req.body.postcontent;

  if (content === "") {
    res.render("dashboard", { message: "Provide some evil content madafaka" });
    return;
  }

  Post.create({ 
    creatorId: req.user._id, 
    content: content, 
    postPic: req.file.url 
  })
    .then(() => res.redirect("/dashboard"))
    .catch(err => `Error creating the post ${err}`)
});

module.exports = router;