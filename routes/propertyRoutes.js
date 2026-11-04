const express = require('express');
const router = express.Router();

// 🚀 Inga ovvoru function-um onnu onna dhaan import aaganum (Duplicate illa)
const {
  createProperty,
  getProperties,
  getPropertyById,
  updatePropertyStatus,
  deleteProperty,
  updateProperty // 🚀 Ithu pudhu function
} = require('../controllers/propertyController');

// Routes
router.post('/', createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id/status', updatePropertyStatus);
router.put('/:id', updateProperty); // 🚀 Ithu pudhu edit route
router.delete('/:id', deleteProperty); // 🚀 Ithu pudhu delete route

module.exports = router;