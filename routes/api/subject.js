const express = require("express");
const router = express.Router();
const Subject = require("../../models/Subject");
router.get("/", (req, res, next) => {
  Subject.find()
    .then(subjects => {
      return res.status(200).json(subjects);
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStateCode = 500;
      return next(error);
    });
});

router.post("/add/:id", (req, res) => {
  const { titeldeutsch, titelarabisch } = req.body;

  new Subject({
    level: req.params.id,
    titeldeutsch,

    titelarabisch
  }).save((err, newSubject) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(201).json(newSubject);
  });
});

module.exports = router;
