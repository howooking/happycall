const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const Animal = require("./models/animal");
const Happycall = require("./models/happycall");
const animalRoute = require("./routes/animal");
const happycallRoute = require("./routes/happycall");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoose connection open");
  })
  .catch((error) => {
    console.log("error happened");
    console.log(error);
  });

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
