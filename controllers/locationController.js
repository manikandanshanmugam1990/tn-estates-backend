const Location = require('../models/Location');

// Get locations (District or Taluk)
exports.getLocations = async (req, res) => {
  try {
    const { type, parentId } = req.query;

    let filter = {};
    if (type) filter.type = type;
    if (parentId) filter.parentId = parentId;

    const locations = await Location.find(filter);
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error: error.message });
  }
};

// Create location
exports.createLocation = async (req, res) => {
  try {
    const newLoc = new Location(req.body);
    await newLoc.save();
    res.status(201).json(newLoc);
  } catch (error) {
    res.status(500).json({ message: 'Error creating location', error: error.message });
  }
};