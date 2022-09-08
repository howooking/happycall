const Animal = require("../models/animalModel");
const mongoose = require("mongoose");

// @desc    등록이 된 모든 동물을 가져온다.
// @route   GET /animal
// @access  Private
const getAllAnimal = async (req, res) => {
  const animals = await Animal.find({})
    .sort({ createdAt: -1 })
    .populate("happycalls");
  res.status(200).json(animals);
};

// @desc    해당 id를 가진 동물을 가져온다.
// @route   GET /animal/:id
// @access  Private
const getSelectedAnimal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Animal not found" });
  }
  const selectedAnimal = await Animal.findById(id);
  if (!selectedAnimal) {
    return res.status(404).json({ error: "Animal not found" });
  }
  res.status(200).json(selectedAnimal);
};

// @desc    새로운 동물을 등록한다.
// @route   POST /animal
// @access  Private
const registerNewAnimal = async (req, res) => {
  try {
    const newAnimal = await Animal.create(req.body);
    res.status(200).json(newAnimal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    해당 id를 가진 동물을 수정한다.
// @route   PUT /animal/:id
// @access  Private
const updateAnimal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Animal not found" });
  }
  const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!updatedAnimal) {
    return res.status(400).json({ error: "Animal not found" });
  }
  res.status(200).json(updatedAnimal);
};

// @desc    해당 id를 가진 동물을 삭제한다.
// @route   DELETE /animal/:id
// @access  Private
const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Animal not found" });
  }
  const deletedAnimal = await Animal.findByIdAndDelete(id);
  if (!deletedAnimal) {
    return res.status(400).json({ error: "Animal not found" });
  }
  res.status(200).json(deletedAnimal);
};

module.exports = {
  getAllAnimal,
  getSelectedAnimal,
  registerNewAnimal,
  updateAnimal,
  deleteAnimal,
};
