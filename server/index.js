//global environment variables
require("dotenv").config();

//epress app
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//cors
const cors = require("cors");

//models
const Animal = require("./models/animalModel");
const Happycall = require("./models/happycallModel");

//routes
const animalRoute = require("./routes/animal");
const happycallRoute = require("./routes/happycall");

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Animal Routes
app.use("/animal", animalRoute);

// Happycall Routes
app.use("/happycall", happycallRoute);

// Happycall관련된 route이지만 /animal이라서 routes로 따로 빼지 못함.
//이런경우 어떻게?
app.post("/animal/:id/happycall", async (req, res) => {
  const { id } = req.params;
  const animal = await Animal.findById(id);
  const newHappycall = new Happycall({ ...req.body, animal });
  await newHappycall.save();
  animal.happycalls.push(newHappycall);
  await animal.save();
});
app.delete("/animal/:id/happycall/:happycallId", async (req, res) => {
  const { id, happycallId } = req.params;
  await Happycall.findByIdAndDelete(happycallId);
  const animal = await Animal.findById(id);
  animal.happycalls.pull(happycallId);
  await animal.save();
  res.status(200).json({ id: happycallId });
});

//mogoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening for requests
    app.listen(port, () => {
      console.log(`connected to DB and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
