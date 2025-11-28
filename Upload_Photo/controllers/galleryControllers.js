const fs = require('fs').promises;
const path = require('path');
const GalleryPhoto = require('../models/galleryModels');
const Event = require('../models/EventModel')

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

  
    // Extract title and description from request body
    const { title, description, eventId } = req.body;

    if(!eventId){
      return res.status(400).json({
        success:false,
        message:"event ID is required"
      })
    }
    const EventExist = await Event.findById(eventId);
    if(!EventExist){
      return res.status(404).json({
        success:false,
        message:"Event Not Found"
      })
    }

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Event title eventId is required' });
    }

    // Create new photo with all fields
    const photo = new GalleryPhoto({ 
      event:eventId,
      imageUrl: `/upload_images/${req.file.filename}`,
      title: title.trim(),
      description: description?.trim() || '' // Handle empty description
    });
    
    await photo.save();
    res.status(201).json({
      message: 'Photo uploaded successfully',
      photo: photo
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Error uploading photo', error: error.message });
  }
};

// Get all photos
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await GalleryPhoto.find().populate('event');
        res.status(200).json(photos);
    } catch (error) {
        console.error('Error retrieving photos:', error);
        res.status(500).json({ message: 'Error retrieving photos', error });
    }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await GalleryPhoto.findById(id);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // ✅ Normalize image path and construct full path safely
    const normalizedImagePath = photo.imageUrl.replace(/^\//, ''); // remove leading slash if present
    const filePath = path.join(__dirname, '..', 'Upload_Photo', normalizedImagePath);

    console.log('Resolved File Path:', filePath);

    try {
      await fs.access(filePath); // check file exists
      await fs.unlink(filePath); // delete it
      console.log('File deleted:', filePath);
    } catch (fileError) {
      // ⚠️ If file not found, skip deleting but still remove DB entry
      console.warn('File not found, skipping unlink:', fileError.code);
    }

    await GalleryPhoto.findByIdAndDelete(id);
    res.status(200).json({ message: 'Photo deleted successfully' });

  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ message: 'Error deleting photo', error });
  }
};

exports.updatePhotoDescription = async (req, res) => {
   try {
    const { id } = req.params;             // photo ID from URL
    const { title, year, description } = req.body; // fields to update

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    // Validate year range
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 2010 || yearNum > currentYear) {
      return res.status(400).json({ 
        message: `Year must be a number between 2010 and ${currentYear}` 
      });
    }

    // Update photo document
    const updatedPhoto = await GalleryPhoto.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        year: yearNum,
        description: description?.trim() || ''
      },
      { new: true } // return updated document
    );

    if (!updatedPhoto) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    res.status(200).json({
      message: 'Photo updated successfully',
      photo: updatedPhoto
    });

  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ message: 'Error updating photo', error: error.message });
  }
};
