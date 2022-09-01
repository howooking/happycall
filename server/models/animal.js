const mongoose = require("mongoose");
const Happycall = require("./happycall");
const Schema = mongoose.Schema;

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    breed: String,
    sex: {
      type: String,
      enum: ["IM", "CM", "IF", "SF", "UK"],
    },
    birth: String,
    image: String,
    memo: String,
    happycalls: [
      {
        type: Schema.Types.ObjectId,
        ref: "Happycall",
      },
    ],
  },
  { timestamps: true }
);

// animalSchema.post("findOneAndRemove", async function (animal) {
//   if (animal.happycalls.length) {
//     await Happycall.deleteMany({ _id: { $in: animal.happycalls } });
//   }
// });

module.exports = mongoose.model("Animal", animalSchema);
