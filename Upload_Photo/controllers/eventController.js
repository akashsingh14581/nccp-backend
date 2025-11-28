const Event = require("../models/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const { name, title, year, description, organizers } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Event Name is required" });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Event Title is required" });
    }

    if (!year) {
      return res.status(400).json({ message: "Event Year is required" });
    }

    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 2010 || yearNum > currentYear) {
      return res.status(400).json({
        message: `Year must be between 2010 and ${currentYear}`
      });
    }

    // Save Event
    const event = await Event.create({
      name: name.trim(),
      title: title.trim(),
      year: yearNum,
      description: description?.trim() || "",
      organizers: organizers || []
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });

  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message
    });
  }
};
