const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['district', 'taluk'], required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', default: null }
});

module.exports = mongoose.model('Location', locationSchema);