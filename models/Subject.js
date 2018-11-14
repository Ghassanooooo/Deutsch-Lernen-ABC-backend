const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  level: {
    type: Schema.Types.ObjectId,
    ref: "level"
  },
  titeldeutsch: {
    type: String,
    required: true
  },
  titelarabisch: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Subject = mongoose.model("subject", SubjectSchema);
