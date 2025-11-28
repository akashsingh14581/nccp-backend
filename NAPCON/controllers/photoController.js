const fs = require("fs").promises;
const path = require("path");
const GalleryPhoto = require("../models/GalleryPhoto");
const Event = require("../models/Event");

// Upload photo (linked to specific event)
exports.uploadPhoto = async (req, res) => {
  try {
    const { eventId, title, description } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    if (!eventId) return res.status(400).json({ message: "Event ID required" });
    if (!title) return res.status(400).json({ message: "Photo title required" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // ✅ Store public path (to serve from frontend)
    const photo = new GalleryPhoto({
      imageUrl: `/gallery_images/${req.file.filename}`,
      title: title.trim(),
      description: description?.trim() || "",
      event: eventId,
    });

    await photo.save();

    // ✅ Link photo to event
    event.photos.push(photo._id);
    await event.save();

    return res.status(201).json({ 
      message: "Photo uploaded successfully", 
      photo 
    });

  } catch (error) {
    console.error("Error uploading photo:", error);
    return res.status(500).json({ message: "Error uploading photo", error: error.message });
  }
};


// Get all photos of a specific event
exports.getPhotosByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const photos = await GalleryPhoto.find({ event: eventId }).sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    console.error("Error retrieving photos:", error);
    res.status(500).json({ message: "Error retrieving photos", error: error.message });
  }
};

// Get all photos (for admin or gallery overview)
exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await GalleryPhoto.find().populate("event", "title organizer").sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    console.error("Error retrieving all photos:", error);
    res.status(500).json({ message: "Error retrieving photos", error: error.message });
  }
};

// Get single photo by ID
exports.getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await GalleryPhoto.findById(id);
    
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    
    res.status(200).json(photo);
  } catch (error) {
    console.error("Error retrieving photo:", error);
    res.status(500).json({ message: "Error retrieving photo", error: error.message });
  }
};

// Update photo details (title, description)
exports.updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Photo title is required" });
    }

    const updatedPhoto = await GalleryPhoto.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description?.trim() || "",
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.status(200).json({
      message: "Photo updated successfully",
      photo: updatedPhoto
    });
  } catch (error) {
    console.error("Error updating photo:", error);
    res.status(500).json({ message: "Error updating photo", error: error.message });
  }
};

// Replace photo file (keep same ID, update image)
exports.replacePhoto = async (req, res) => {
  try {
    const { photoId, title, description } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    if (!photoId) return res.status(400).json({ message: "Photo ID required" });

    const existingPhoto = await GalleryPhoto.findById(photoId);
    if (!existingPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Delete old file
    const oldFilePath = path.join(__dirname, "../Upload_Photo/gallery_images", path.basename(existingPhoto.imageUrl));
    await fs.unlink(oldFilePath).catch(() => {
      console.log("Old file not found or already deleted");
    });

    // Update photo with new file
    const updatedPhoto = await GalleryPhoto.findByIdAndUpdate(
      photoId,
      {
        imageUrl: path.join("/upload_images", req.file.filename).replace(/\\/g, "/"),
        title: title?.trim() || existingPhoto.title,
        description: description?.trim() || existingPhoto.description,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({
      message: "Photo replaced successfully",
      photo: updatedPhoto
    });
  } catch (error) {
    console.error("Error replacing photo:", error);
    res.status(500).json({ message: "Error replacing photo", error: error.message });
  }
};

// Update photo order for an event
exports.updatePhotoOrder = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { photoOrder } = req.body; // Array of { id, order }

    if (!Array.isArray(photoOrder)) {
      return res.status(400).json({ message: "Photo order array is required" });
    }

    // Update each photo's order field
    const updatePromises = photoOrder.map(item =>
      GalleryPhoto.findByIdAndUpdate(
        item.id,
        { order: item.order },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    // Get updated photos in new order
    const updatedPhotos = await GalleryPhoto.find({ event: eventId }).sort({ order: 1 });

    res.status(200).json({
      message: "Photo order updated successfully",
      photos: updatedPhotos
    });
  } catch (error) {
    console.error("Error updating photo order:", error);
    res.status(500).json({ message: "Error updating photo order", error: error.message });
  }
};

// Delete photo
exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await GalleryPhoto.findById(id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    // Delete from uploads folder
    const filePath = path.join(__dirname, "../Upload_Photo/gallery_images", path.basename(photo.imageUrl));
    await fs.unlink(filePath).catch(() => {});

    // Remove photo reference from event
    await Event.findByIdAndUpdate(
      photo.event,
      { $pull: { photos: id } }
    );

    // Delete from DB
    await GalleryPhoto.findByIdAndDelete(id);

    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ message: "Error deleting photo", error: error.message });
  }
};