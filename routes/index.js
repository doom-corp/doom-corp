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
      console.log(req.user);
      const data = { user: req.user, posts: posts };
      res.render("dashboard", data);
    })
    .catch(err => `Error finding posts: ${err}`);
})

/*POST attack*/ 
router.get("/attack", ensureLoggedIn("/"), (req, res, next) => {
  
  //res.render("dashboard", { user: req.user });
})


/* POST new posts */

router.post("/newpost", uploadCloud.single("photo"), (req, res, next) => {
  let content = req.body.postcontent;
  let title = req.body.posttitle;

  if (title === "" || content === "") {
    res.render("dashboard", { message: "Provide some evil content madafaka" });
    return;
  }

  Post.create({ 
    creatorId: req.user._id, 
    title: title,
    content: content, 
    postPic: req.file.url 
  })
    .then(() => res.redirect("/dashboard"))
    .catch(err => `Error creating the post ${err}`)
});

module.exports = router;
