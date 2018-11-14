// i can check if user auth by req.user becuse i set the user in req in app file
// so if wanna to find user by id i wright req.user._id  :)
// to create predect routes we can call login middleware from  ../../middlewares/login
// user login like this router.post('/', login, (req,res)=>{})

const express = require("express");
const router = express.Router();
const Level = require("../../models/Level");
router.get("/", (req, res) => {
  Level.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
});

router.post("/add", (req, res) => {
  const {
    titeldeutsch,
    beschreibungdeutsch,
    titelarabisch,
    beschreibungarabisch
  } = req.body;
  new Level({
    titeldeutsch,
    beschreibungdeutsch,
    titelarabisch,
    beschreibungarabisch
  }).save((err, newLevel) => {
    if (err) {
      res.json({ error: err });
    }
    res.json(newLevel);
  });
});

module.exports = router;
