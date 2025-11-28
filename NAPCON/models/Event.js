// models/Event.js
const { truncateSync } = require("fs");
const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
});

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  photos: [
  { type: mongoose.Schema.Types.ObjectId, ref: "GalleryPhoto" }
],
  organizers: [organizerSchema],
}, {timestamps:true});

module.exports = mongoose.model("Event", eventSchema);
