const Animal = require("../models/animal");

// @desc    등록이 된 모든 동물들의 데이터를 가져온다.
// @route   GET /animal
// @access  Private
const getAllAnimal = async (req, res) => {
  const animals = await Animal.find({}).populate("happycalls");
  res.status(200).json(animals);
};

// @desc    해당 id를 가진 동물의 데이터를 가져온다.
// @route   GET /animal/:id
// @access  Private
const getSelectedAnimal = async (req, res) => {
  const { id } = req.params;
  const selectedAnimal = await Animal.findById(id);
  res.status(200).json(selectedAnimal);
};

// @desc    새로운 동물을 등록한다.
// @route   POST /animal
// @access  Private
const registerNewAnimal = async (req, res) => {
  const newAnimal = new Animal(req.body);
  await newAnimal.save();
  res.status(200).json({ message: "animal registsered" });
};

// @desc    해당 id를 가진 동물의 데이터를 수정한다.
// @route   PUT /animal/:id
// @access  Private
const updateAnimal = async (req, res) => {
  const { id } = req.params;
  await Animal.findByIdAndUpdate(id, req.body, { runValidators: true });
};

// @desc    해당 id를 가진 동물을 삭제한다.
// @route   DELETE /animal/:id
// @access  Private
const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  await Animal.findByIdAndRemove(id);
};

module.exports = {
  getAllAnimal,
  getSelectedAnimal,
  registerNewAnimal,
  updateAnimal,
  deleteAnimal,
};
