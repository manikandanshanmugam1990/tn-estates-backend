const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  sellerName: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerMobile: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New' } // New, Read, Replied
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);