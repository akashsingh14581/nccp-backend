
const mongoose = require('mongoose');

const galleryPhotoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },

  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },

  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },

}, {timestamps:true});


module.exports = mongoose.model('GalleryPhoto', galleryPhotoSchema);