const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const A1Schema = new Schema({
  kursinhalte: [
    {
      titeldeutsch: {
        type: String,
        required: true
      },
      titelarabisch: {
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
          },
          beschreibung: {
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = A1 = mongoose.model("a1", A1Schema);
