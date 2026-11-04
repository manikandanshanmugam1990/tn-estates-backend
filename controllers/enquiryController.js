const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry sent successfully', enquiry: newEnquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error sending enquiry', error: error.message });
  }
};

exports.getSellerEnquiries = async (req, res) => {
  try {
    const { sellerName } = req.query;
    // Seller-ku vandha enquiries mattum (populate property details)
    const enquiries = await Enquiry.find({ sellerName }).populate('propertyId').sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enquiries', error: error.message });
  }
};