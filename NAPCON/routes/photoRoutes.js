const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { 
  uploadPhoto, 
  deletePhoto, 
  getAllPhotos, 
  getPhotosByEvent,
  getPhotoById,
  updatePhoto,
  replacePhoto,
  updatePhotoOrder
} = require("../controllers/photoController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Upload_Photo/gallery_images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("photo"), uploadPhoto);
router.get("/", getAllPhotos);
router.get("/:id", getPhotoById);
router.put("/:id", updatePhoto);
router.put("/replace", upload.single("photo"), replacePhoto);
router.put("/order/:eventId", updatePhotoOrder);
router.delete("/:id", deletePhoto);
router.get("/event/:eventId", getPhotosByEvent);

module.exports = router;