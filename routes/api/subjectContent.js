const express = require("express");
const router = express.Router();
const SubjectContent = require("../../models/SubjectContent");
router.get("/:id", (req, res) => {
  SubjectContent.findOne({ subject: req.params.id })
    .then(subjectContent => {
      if (!subjectContent) {
        return res.json({ msg: "the Content items not found" });
      }
      return res.json(subjectContent);
    })
    .catch(err => console.log(err));
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
