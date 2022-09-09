const Happycall = require("../models/happycallModel");
const Animal = require("../models/animalModel");
const mongoose = require("mongoose");

// @desc    등록이 된 모든 해피콜 데이터를 가져온다.
// @route   GET /happycall
// @access  Private
const getAllHappycall = async (req, res) => {
  const happycall = await Happycall.find({})
    .sort({ createdAt: -1 })
    .populate("animal");
  res.status(200).json(happycall);
};

// @desc    해당 id를 가진 해피콜 데이터를 가져온다.
// @route   GET happycall/:id
// @access  Private
const getSelectedHappycall = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Happycall not found" });
  }
  const selectedHappycall = await Happycall.findById(id).populate("animal");
  if (!selectedHappycall) {
    return res.status(400).json({ error: "Happycall not found" });
  }
  res.status(200).json(selectedHappycall);
};

// @desc    해피콜을 생성한다.
// @route   POST happycall/animal/:id
// @access  Private
const createHappycall = async (req, res) => {
  const { id } = req.params;
  try {
    const animal = await Animal.findById(id);
    const newHappycall = new Happycall({ ...req.body, animal });
    await newHappycall.save();
    animal.happycalls.push(newHappycall);
    res.status(200).json(newHappycall);
    await animal.save();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    해당 id를 가진 해피콜을 수정한다.
// @route   PUT /happycall/:id
// @access  Private
const updateHappycall = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Happycall not found" });
  }
  const updatedHappycall = await Happycall.findByIdAndUpdate(
    id,
    { ...req.body, isDone: true },
    { runValidators: true, new: true }
  );
  if (!updatedHappycall) {
    return res.status(400).json({ error: "Happycall not found" });
  }
  res.status(200).json(updatedHappycall);
};

// @desc    해당 id를 가진 해피콜을 삭제한다.
// @route   DELETE /happycall/:id/animal/:animalId
// @access  Private
const deleteHappycall = async (req, res) => {
  const { id, animalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "happycall not found" });
  }
  const deletedHappycall = await Happycall.findByIdAndDelete(id);
  const animal = await Animal.findById(animalId);
  await animal.happycalls.pull(id);
  await animal.save();
  res.status(200).json(deletedHappycall);
};

module.exports = {
  getAllHappycall,
  getSelectedHappycall,
  updateHappycall,
  createHappycall,
  deleteHappycall,
};
