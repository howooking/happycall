const mongoose = require("mongoose");
const Animal = require("./animalModel");
const Schema = mongoose.Schema;

const happycallSchema = new Schema(
  {
    cc: {
      type: String,
      required: true,
    },
    callDate: {
      type: String,
      required: true,
    },
    improve: {
      type: Number,
      default: 3,
    },
    memo: String,
    isDone: {
      type: Boolean,
      default: false,
    },
    animal: {
      type: Schema.Types.ObjectId,
      ref: "Animal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Happycall", happycallSchema);
