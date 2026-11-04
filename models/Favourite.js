const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  buyerName: { type: String, required: true }, // Ippo namma localStorage name use pandrom
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }
}, { timestamps: true });

// Oru buyer oru property-ah rendu thadava favourite panna koodadhu
favouriteSchema.index({ buyerName: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model('Favourite', favouriteSchema);