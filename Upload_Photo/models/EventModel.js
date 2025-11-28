const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    maxlength: [100, 'Event name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  year: {
    type: Number,
    required: [true, 'Event year is required'],
    min: [2010, 'Year must be at least 2010'],
    max: [new Date().getFullYear(), `Year cannot exceed ${new Date().getFullYear()}`]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  organizers: [
    {
      name: {
        type: String,
        required: [true, 'Organizer name is required'],
        trim: true
      },
      role: {
        type: String,
        default: 'Organizer',
        trim: true
      }
    }
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GalleryPhoto'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
