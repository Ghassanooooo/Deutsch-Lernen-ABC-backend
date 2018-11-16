const express = require("express");
const router = express.Router();
const SubjectContent = require("../../models/SubjectContent");
router.get("/:id", (req, res, next) => {
  SubjectContent.findOne({ subject: req.params.id })
    .then(subjectContent => {
      if (!subjectContent) {
        return res.status(404).json({ error: "the Content items not found" });
      }
      return res.status(200).json(subjectContent);
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
      return res.status(500).json({ error: err });
    }
    return res.status(201).json(newSubjectContent);
  });
});

module.exports = router;
