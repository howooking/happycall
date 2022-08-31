const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const Animal = require("./models/animal");
const Happycall = require("./models/happycall");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/happyCall")
  .then(() => {
    console.log("mongoose connection open");
  })
  .catch((err) => {
    console.log("error happened");
    console.log(error);
  });

app.use(cors({ origin: "*" }));
app.use(express.json());

//Animal
app.get("/animal", async (req, res) => {
  const animals = await Animal.find({});
  res.send(animals);
});

app.get("/animal/:id", async (req, res) => {
  const { id } = req.params;
  const selectedAnimal = await Animal.findById(id);
  res.send(selectedAnimal);
});

app.post("/animal", async (req, res) => {
  const newAnimal = new Animal(req.body, { runValidators: true });
  await newAnimal.save();
});

app.put("/animal/:id", async (req, res) => {
  const { id } = req.params;
  await Animal.findByIdAndUpdate(id, req.body, { runValidators: true });
});
app.delete("/animal/:id", async (req, res) => {
  const { id } = req.params;
  await Animal.findByIdAndRemove(id);
});

// Happycall
app.get("/happycall", async (req, res) => {
  const happycall = await Happycall.find({}).populate("animal");
  res.send(happycall);
});

app.get("/happycall/:id", async (req, res) => {
  const { id } = req.params;
  const selectedHappycall = await Happycall.findById(id).populate("animal");
  res.send(selectedHappycall);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
