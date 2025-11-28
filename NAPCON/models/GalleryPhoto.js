const mongoose = require("mongoose");

const galleryPhotoSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
      order: {
    type: Number,
    default: 0,
  },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },

  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
module.exports =
  mongoose.models.GalleryPhoto ||
  mongoose.model("GalleryPhoto", galleryPhotoSchema);
