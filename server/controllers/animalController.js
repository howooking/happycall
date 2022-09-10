const Animal = require("../models/animalModel");
const mongoose = require("mongoose");

// @desc    get all animals
// @route   GET /animal
// @access  Private
const getAllAnimal = async (req, res) => {
  //find all animals in mongodb
  const animals = await Animal.find({})
    .sort({ createdAt: -1 })
    .populate("happycalls");
  res.status(200).json(animals);
};

// @desc    get a single aimal
// @route   GET /animal/:id
// @access  Private
const getSelectedAnimal = async (req, res) => {
  const { id } = req.params;
  //몽구스 id형식에 맞지 않아서 발생하는 오류 캐치
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Animal not found" });
  }
  //몽구스 id형식은 맞지만 해당 id가 db에 없는 경우
  const selectedAnimal = await Animal.findById(id);
  if (!selectedAnimal) {
    return res.status(404).json({ error: "Animal not found" });
  }
  res.status(200).json(selectedAnimal);
};

// @desc    register a animal
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

// @desc    edit a animal
// @route   PUT /animal/:id
// @access  Private
const updateAnimal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Animal not found" });
  }
  const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, {
    //업데이트 할 때도 animal schema의 validation사용
    runValidators: true,
    //반환값이 업데이트 된 동물
    new: true,
  });
  if (!updatedAnimal) {
    return res.status(400).json({ error: "Animal not found" });
  }
  res.status(200).json(updatedAnimal);
};

// @desc    delete a animal
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
