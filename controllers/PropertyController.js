const Property = require('../models/Property');

// @desc    Create a new property
// @route   POST /api/properties
exports.createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

// @desc    Get all properties (with filters)
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const { status, location, category } = req.query;
    let filter = {};

    // Status filter (Approved, Pending)
    if (status) {
      filter.status = status;
    }

    // Location filter (Case-insensitive search)
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    // Category filter
    if (category && category !== 'All Properties') {
      filter.category = category;
    }

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

// @desc    Get a single property by ID
// @route   GET /api/properties/:id
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};

// @desc    Update Property Status (Approve/Reject)
// @route   PUT /api/properties/:id/status
exports.updatePropertyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const { status, district, taluk, category } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (district) filter.district = district; // 🚀 Ithu pudhu
    if (taluk) filter.taluk = taluk;           // 🚀 Ithu pudhu

    if (category && category !== 'All Properties') {
      filter.category = category;
    }

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

exports.holdMultiplePlots = async (req, res) => {
  try {
    const { plotIds } = req.body;
    if (!plotIds || !Array.isArray(plotIds)) {
      return res.status(400).json({ message: "Invalid plot IDs" });
    }

    const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    const plots = await Plot.find({ _id: { $in: plotIds } });
    const unavailable = plots.find(p => p.status !== 'Available');
    if (unavailable) {
      return res.status(400).json({ message: `Plot ${unavailable.plotNumber} is not available` });
    }

    await Plot.updateMany(
      { _id: { $in: plotIds } },
      { status: 'Hold', holdExpiresAt: expiryTime }
    );

    // 🚀 Update aana plots-ah thirumba fetch pandrom
    const updatedPlots = await Plot.find({ _id: { $in: plotIds } });

    res.status(200).json({ message: 'Plots held successfully', plots: updatedPlots });
  } catch (error) {
    res.status(500).json({ message: 'Error holding plots', error: error.message });
  }
};

const Plot = require('../models/Plot'); // Mela import pannunga

// Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Property-ah delete pandrom
    const property = await Property.findByIdAndDelete(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // 🚀 Andha property-ku ulla irukkura plots-ayum delete pandrom
    await Plot.deleteMany({ projectId: propertyId });

    res.status(200).json({ message: 'Property and associated plots deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};

// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};