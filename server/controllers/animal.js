const Animal = require("../models/animal");

// @desc    등록이 된 모든 동물을 가져온다.
// @route   GET /animal
// @access  Private
const getAllAnimal = async (req, res) => {
  const animals = await Animal.find({}).populate("happycalls");
  res.status(200).json(animals);
};

// @desc    해당 id를 가진 동물을 가져온다.
// @route   GET /animal/:id
// @access  Private
const getSelectedAnimal = async (req, res) => {
  const { id } = req.params;
  const selectedAnimal = await Animal.findById(id);
  if (!selectedAnimal) {
    res.status(400);
    throw new Error("Animal not found");
  }
  res.status(200).json(selectedAnimal);
};

// @desc    새로운 동물을 등록한다.
// @route   POST /animal
// @access  Private
const registerNewAnimal = async (req, res) => {
  const newAnimal = new Animal(req.body);
  await newAnimal.save();
  res.status(200).json(newAnimal);
};

// @desc    해당 id를 가진 동물을 수정한다.
// @route   PUT /animal/:id
// @access  Private
const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json(updatedAnimal);
};

// @desc    해당 id를 가진 동물을 삭제한다.
// @route   DELETE /animal/:id
// @access  Private
const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  await Animal.findByIdAndRemove(id);
  res.status(200).json({ id: id });
};

module.exports = {
  getAllAnimal,
  getSelectedAnimal,
  registerNewAnimal,
  updateAnimal,
  deleteAnimal,
};
