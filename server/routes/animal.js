const express = require("express");
const router = express.Router();
const {
  getAllAnimal,
  getSelectedAnimal,
  registerNewAnimal,
  updateAnimal,
  deleteAnimal,
} = require("../controllers/animalController");

router.route("/").get(getAllAnimal).post(registerNewAnimal);
router
  .route("/:id")
  .get(getSelectedAnimal)
  .put(updateAnimal)
  .delete(deleteAnimal);

module.exports = router;
