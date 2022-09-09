const express = require("express");
const router = express.Router();
const {
  getAllHappycall,
  getSelectedHappycall,
  updateHappycall,
  createHappycall,
  deleteHappycall,
} = require("../controllers/happycallController");

router.route("/").get(getAllHappycall);
router.route("/:id").get(getSelectedHappycall).put(updateHappycall);
router.route("/animal/:id").post(createHappycall);
router.route("/:id/animal/:animalId").delete(deleteHappycall);

module.exports = router;
