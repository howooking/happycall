const express = require("express");
const router = express.Router();
const {
  getAllHappycall,
  getSelectedHappycall,
  updateHappycall,
} = require("../controllers/happycall");

router.route("/").get(getAllHappycall);
router.route("/:id").get(getSelectedHappycall).put(updateHappycall);

module.exports = router;
