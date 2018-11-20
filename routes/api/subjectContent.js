const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const SubjectContent = require("../../models/SubjectContent");
router.get("/:id", async (req, res, next) => {
  try {
    const subjectContent = await SubjectContent.findOne({
      subject: req.params.id
    });
    if (!subjectContent) {
      return res.status(200).json(null);
    }
    return res.status(200).json(subjectContent);
  } catch (e) {
    const error = new Error(e);
    error.httpStateCode = 500;
    return next(error);
  }
});

router.post("/add/:id", (req, res) => {
  const {
    beschreibung,
    inhaltenDeutsch,
    inhaltenArabisch,
    beispielenDeutsch,
    beispielenArabisch
  } = req.body;

  const inhaltenErgebnisse = [];
  const beispielenErgebnisse = [];

  inhaltenDeutsch.split(",").map(inh => {
    inhaltenErgebnisse.push({ deutsch: inh.trim() });
  });

  beispielenDeutsch.split(",").map(bei => {
    beispielenErgebnisse.push({ deutsch: bei.trim() });
  });

  inhaltenErgebnisse.map(inhaltenErgebniss => {
    inhaltenArabisch.split(",").map(inh => {
      inhaltenErgebniss.arabisch = inh.trim();
    });
  });

  beispielenErgebnisse.map(beispielenErgebniss => {
    beispielenArabisch.split(",").map(bei => {
      beispielenErgebniss.arabisch = bei.trim();
    });
  });
  console.log(inhaltenErgebnisse);
  console.log(beispielenErgebnisse);

  new SubjectContent({
    subject: req.params.id,
    beschreibung,
    inhalten: inhaltenErgebnisse,
    beispielen: beispielenErgebnisse
  }).save((err, newSubjectContent) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json(newSubjectContent);
  });
});

module.exports = router;
