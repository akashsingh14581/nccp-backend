const express = require("express");
const router = express.Router();

const winnerController = require("../controllers/winnerController");

// Create winner independently (optional)
router.post("/", winnerController.createWinner);

// Get all winners
router.get("/", winnerController.getAllWinners);

// Get single winner by ID
router.get("/:id", winnerController.getWinnerById);

// Update winner by ID
router.put("/:id", winnerController.updateWinner);

// Delete winner by ID
router.delete("/:id", winnerController.deleteWinner);

module.exports = router;
