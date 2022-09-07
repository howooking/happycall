const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const Animal = require("./models/animal");
const Happycall = require("./models/happycall");
const animalRoute = require("./routes/animal");
const { errorHandler } = require("./middleware/errorMiddleware");

const mongoose = require("mongoose");
const { urlencoded } = require("express");
mongoose
  .connect("mongodb://localhost:27017/happyCall")
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

//Animal
app.use("/animal", animalRoute);

// Happycall
app.get("/happycall", async (req, res) => {
  const happycall = await Happycall.find({}).populate("animal");
  res.json(happycall);
});
app.get("/happycall/:id", async (req, res) => {
  const { id } = req.params;
  const selectedHappycall = await Happycall.findById(id).populate("animal");
  res.json(selectedHappycall);
});
app.put("/happycall/:id", async (req, res) => {
  const { id } = req.params;
  await Happycall.findByIdAndUpdate(
    id,
    { ...req.body, isDone: true },
    { runValidators: true }
  );
});
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
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ statusCode: res.statusCode, errMessage: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
