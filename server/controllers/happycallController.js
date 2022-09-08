const Happycall = require("../models/happycallModel");

// @desc    등록이 된 모든 해피콜 데이터를 가져온다.
// @route   GET /happycall
// @access  Private
const getAllHappycall = async (req, res) => {
  const happycall = await Happycall.find({}).populate("animal");
  res.status(200).json(happycall);
};

// @desc    해당 id를 가진 해피콜 데이터를 가져온다.
// @route   GET /happycall/:id
// @access  Private
const getSelectedHappycall = async (req, res) => {
  const { id } = req.params;
  const selectedHappycall = await Happycall.findById(id).populate("animal");
  if (!selectedHappycall) {
    res.status(400);
    throw new Error("Happycall not found");
  }
  res.status(200).json(selectedHappycall);
};

// @desc    해당 id를 가진 해피콜을 수정한다.
// @route   GET /happycall/:id
// @access  Private
const updateHappycall = async (req, res) => {
  const { id } = req.params;
  const updatedHappycall = await Happycall.findByIdAndUpdate(
    id,
    { ...req.body, isDone: true },
    { runValidators: true, new: true }
  );
  res.status(200).json(updatedHappycall);
};
module.exports = {
  getAllHappycall,
  getSelectedHappycall,
  updateHappycall,
};
