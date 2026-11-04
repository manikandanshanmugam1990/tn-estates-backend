const Booking = require('../models/Booking');
const Plot = require('../models/Plot');

// Create Booking and Update Plot Status
exports.createBooking = async (req, res) => {
  try {
    const { plotId, projectId, buyerName, buyerMobile, buyerEmail, tokenAmount, paymentMode } = req.body;

    // 1. Booking create pandrom
    const newBooking = new Booking({
      plotId, projectId, buyerName, buyerMobile, buyerEmail, tokenAmount, paymentMode
    });
    await newBooking.save();

    // 2. Andha plot-ah "Booked" nu update pandrom
    await Plot.findByIdAndUpdate(plotId, { status: 'Booked' });

    res.status(201).json({ message: 'Booking Successful', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get all bookings (For demo, we will fetch all)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Update Booking Status (Confirm Payment)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Confirmed' or 'Rejected'
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};