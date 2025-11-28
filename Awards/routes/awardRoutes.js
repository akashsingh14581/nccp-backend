const express = require("express");
const router = express.Router();

const awardController = require("../controllers/awardController");

// Create award with multiple winners
router.post("/", awardController.createAwardWithWinners);

// Get all awards with winners
router.get("/", awardController.getAllAwards);

// Get single award by ID
router.get("/:id", awardController.getAwardById);

// Update award by ID
router.put("/:id", awardController.updateAward);

// Delete award by ID
router.delete("/:id", awardController.deleteAward);

module.exports = router;
