const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

// Single image upload route
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    res.status(200).json({ imageUrl: req.file.path }); // Cloudinary URL
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

module.exports = router;