const Happycall = require("../models/happycallModel");
const Animal = require("../models/animalModel");
const mongoose = require("mongoose");

// @desc    get all happycalls
// @route   GET /happycall
// @access  Private
const getAllHappycall = async (req, res) => {
  const happycall = await Happycall.find({})
    .sort({ createdAt: -1 })
    .populate("animal");
  res.status(200).json(happycall);
};

// @desc    get a single happycall
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

// @desc    create a happycall
// @route   POST happycall/animal/:id
// @access  Private
const createHappycall = async (req, res) => {
  const { id } = req.params;
  try {
    //id에 해당하는 동물을 찾음
    const animal = await Animal.findById(id);
    //새로운 happycall의 animal 항목에 animal의 id가 들어감.
    const newHappycall = new Happycall({ ...req.body, animal });
    await newHappycall.save();
    //해당 animal의 happycalls 배열에 새로운 happycall의 id가 들어감.
    animal.happycalls.push(newHappycall);
    await animal.save();
    res.status(200).json(newHappycall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    edit a happycall
// @route   PUT /happycall/:id
// @access  Private
const updateHappycall = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Happycall not found" });
  }
  const updatedHappycall = await Happycall.findByIdAndUpdate(
    id,
    //"기록"을 누르면 todo가 완료된 것이므로 isDone이 자동으로 true가 된다.
    { ...req.body, isDone: true },
    //validator와 업데이트 된 반환값
    { runValidators: true, new: true }
  );
  if (!updatedHappycall) {
    return res.status(400).json({ error: "Happycall not found" });
  }
  res.status(200).json(updatedHappycall);
};

// @desc    delete a happycall
// @route   DELETE /happycall/:id/animal/:animalId
// @access  Private
const deleteHappycall = async (req, res) => {
  const { id, animalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "happycall not found" });
  }
  //id에 해당하는 happycall을 삭제
  const deletedHappycall = await Happycall.findByIdAndDelete(id);
  //animalId에 해당하는 animal을 찾음
  const animal = await Animal.findById(animalId);
  //animal안의 happycalls 배열에서 id에 해당하는 happycall id 삭제
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
