const express = require("express");
const router = express.Router();
const Subject = require("../../models/Subject");
router.get("/", (req, res) => {
  Subject.find()
    .then(subjects => {
      return res.json(subjects);
    })
    .catch(err => console.log(err));
});

router.post("/add/:id", (req, res) => {
  const { titeldeutsch, titelarabisch } = req.body;

  new Subject({
    level: req.params.id,
    titeldeutsch,

    titelarabisch
  }).save((err, newSubject) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(newSubject);
  });
});

module.exports = router;
