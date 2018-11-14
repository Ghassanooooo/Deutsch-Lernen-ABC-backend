const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectContentSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject"
  },
  beschreibung: {
    type: String,
    required: true
  },
  inhalten: [
    {
      deutsch: {
        type: String,
        required: true
      },
      arabisch: {
        type: String,
        required: true
      }
    }
  ],
  beispielen: [
    {
      deutsch: {
        type: String,
        required: true
      },
      arabisch: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SubjectContent = mongoose.model(
  "subjectContent",
  SubjectContentSchema
);
