const mongoose = require("mongoose");
const Happycall = require("./happycallModel");
const Schema = mongoose.Schema;

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    owner: {
      type: String,
      required: [true, "owner is required"],
    },
    phonenumber: {
      type: String,
      required: [true, "phonenumber is required"],
    },
    species: {
      type: String,
    },
    breed: String,
    sex: {
      type: String,
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

animalSchema.post("findOneAndDelete", async function (animal) {
  console.log(animal);
  if (animal.happycalls.length) {
    const res = await Happycall.deleteMany({ _id: { $in: animal.happycalls } });
    console.log(res);
  }
});

module.exports = mongoose.model("Animal", animalSchema);
