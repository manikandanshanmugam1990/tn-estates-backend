const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  projectId: { type: String, required: true }, // Endha property/project-ku ulla irukku
  plotNumber: { type: String, required: true }, // P1, P2
  status: { type: String, default: 'Available' }, // Available, Hold, Booked
  price: { type: String, required: true },
  size: { type: String, required: true },
  x: { type: String, required: true }, // Map-la position (e.g., "20%")
  y: { type: String, required: true },
   // Ithu pudhu field: Hold eppo expire aaganum nu time store panna
  holdExpiresAt: { type: Date, default: null }
});

module.exports = mongoose.model('Plot', plotSchema);