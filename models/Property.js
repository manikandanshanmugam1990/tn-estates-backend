const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true }, // 🚀 Pudhu field
  taluk: { type: String, required: true },    // 🚀 Pudhu field
  category: { type: String, required: true },
  size: { type: String, required: true },
  images: { type: [String], default: [] },
  sellerName: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  latitude: { type: Number, default: 13.0827 },
  longitude: { type: Number, default: 80.2707 }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);