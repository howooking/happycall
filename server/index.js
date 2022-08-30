const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const Animal = require("./models/animal");

const mongoose = require("mongoose");
const { findByIdAndUpdate } = require("./models/animal");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
