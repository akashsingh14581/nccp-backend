const express = require('express');
const multer = require('multer');
const path = require('path');
const GalleryController = require('../controllers/galleryControllers');

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: './upload_images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Routes
// router.post('/upload', GalleryController.uploadPhoto);
router.post('/upload', upload.single('photo'), GalleryController.uploadPhoto);
router.get('/photos', GalleryController.getAllPhotos);
router.delete('/photos/:id', GalleryController.deletePhoto);
router.put('/photos/:id/details', GalleryController.updatePhotoDescription);

module.exports = router;
