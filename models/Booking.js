const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  plotId: { type: String, required: true },
  projectId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerMobile: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  tokenAmount: { type: Number, required: true },
  paymentMode: { type: String, required: true }, // Plan A or Plan B
  status: { type: String, default: 'Pending' } // Pending, Confirmed
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);