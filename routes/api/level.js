// i can check if user auth by req.user becuse i set the user in req in app file
// so if wanna to find user by id i wright req.user._id  :)
// to create predect routes we can call login middleware from  ../../middlewares/login
// user login like this router.post('/', login, (req,res)=>{})

const express = require("express");
const router = express.Router();
const Level = require("../../models/Level");
router.get("/", async (req, res, next) => {
  try {
    const level = await Level.find();
    if (!level) {
      return res.status(404).json({ error: "the Subjects items not found" });
    }
    return res.status(200).json(level);
  } catch (e) {
    const error = new Error(e);
    error.httpStateCode = 500;
    return next(error);
  }
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
      return res.status(500).json({ error: err });
    }
    return res.status(201).json(newLevel);
  });
});

module.exports = router;
