const express = require("express");
const router = express.Router();
const { 
  createEvent, 
  getAllEvents, 
  getEventWithPhotos, 
  updateEvent, 
  deleteEvent 
} = require("../controllers/eventController");

// Routes
router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventWithPhotos);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;