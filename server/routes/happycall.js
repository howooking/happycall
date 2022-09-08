const express = require("express");
const router = express.Router();
const {
  getAllHappycall,
  getSelectedHappycall,
  updateHappycall,
} = require("../controllers/happycallController");

router.route("/").get(getAllHappycall);
router.route("/:id").get(getSelectedHappycall).put(updateHappycall);

module.exports = router;
