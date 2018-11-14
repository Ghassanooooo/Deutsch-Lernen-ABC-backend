const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  titeldeutsch: {
    type: String,
    required: true
  },
  beschreibungdeutsch: {
    type: String,
    required: true
  },
  titelarabisch: {
    type: String,
    required: true
  },
  beschreibungarabisch: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Level = mongoose.model("level", LevelSchema);
