const Event = require("../models/Event");

// ✅ Create a new event with organizers (embedded)
exports.createEvent = async (req, res) => {
  try {
    const { eventName, title, description, year, organizers } = req.body;

    if (!eventName || !title || !description || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // organizers should be an array of objects: [{ name, role }]
    if (!Array.isArray(organizers) || organizers.length === 0) {
      return res.status(400).json({ message: "At least one organizer is required" });
    }

    const newEvent = new Event({
      eventName: eventName.trim(),
      title: title.trim(),
      description: description.trim(),
      year,
      organizers,
    });

    await newEvent.save();

    res.status(201).json({
      message: "✅ Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("❌ Error creating event:", error);
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// ✅ Get all events with photo count
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("photos", "imageUrl title description");

    // add totalPhotos field for each event
    const formattedEvents = events.map(event => ({
      ...event.toObject(),
      totalPhotos: event.photos.length,
      coverPhoto: event.photos[0]?.imageUrl || null, // first photo as cover
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// ✅ Get single event with all photos
exports.getEventWithPhotos = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id)
      .populate("photos", "imageUrl title description");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("❌ Error fetching event details:", error);
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// ✅ Update event (including organizers)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, title, description, year, organizers } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { eventName, title, description, year, organizers },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "✅ Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("❌ Error updating event:", error);
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

// ✅ Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "🗑️ Event deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};
