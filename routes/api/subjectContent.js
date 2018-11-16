const express = require("express");
const router = express.Router();
const SubjectContent = require("../../models/SubjectContent");
router.get("/:id", (req, res, next) => {
  SubjectContent.findOne({ subject: req.params.id })
    .then(subjectContent => {
      if (!subjectContent) {
        return res.json({ error: "the Content items not found" });
      }
      return res.json(subjectContent);
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStateCode = 500;
      return next(error);
    });
});

router.post("/add/:id", (req, res) => {
  const { beschreibung, inhalten, beispielen } = req.body;

  new SubjectContent({
    subject: req.params.id,
    beschreibung,
    inhalten,
    beispielen
  }).save((err, newSubjectContent) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(newSubjectContent);
  });
});

module.exports = router;
