const express = require('express');
const router  = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");
const Post = require("../models/Post");
const City = require("../models/City");


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
router.post("/attack", ensureLoggedIn("/"), (req, res, next) => {
  
  //res.render("user/profile", { user: req.user });
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


/*SAVE coordinates*/

router.get("/save", (req, res, next) => {
  const cityName = req.query.direction;
  const log = req.query.log;
  const lat = req.query.lat;
  const city = new City({
    cityName : cityName,
    coordinates : {
      lat: lat,
      long : log
    }
  })
  city.save().then( () => {
    res.redirect("/user")
  })
})

module.exports = router;
