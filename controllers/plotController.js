const Plot = require('../models/Plot');

// 1. Get all plots for a specific project
exports.getPlots = async (req, res) => {
  try {
    const plots = await Plot.find({ projectId: req.params.projectId });
    res.status(200).json(plots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plots', error: error.message });
  }
};

// 2. Get single plot by ID
exports.getPlotById = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: 'Plot not found' });
    res.status(200).json(plot);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plot', error: error.message });
  }
};

// 3. Create a plot
exports.createPlot = async (req, res) => {
  try {
    const newPlot = new Plot(req.body);
    const savedPlot = await newPlot.save();
    res.status(201).json(savedPlot);
  } catch (error) {
    res.status(500).json({ message: 'Error creating plot', error: error.message });
  }
};

// 4. Hold a single plot for 15 minutes
exports.holdPlot = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: 'Plot not found' });

    if (plot.status !== 'Available') {
      return res.status(400).json({ message: 'Plot is not available' });
    }

    const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    plot.status = 'Hold';
    plot.holdExpiresAt = expiryTime;
    await plot.save();

    res.status(200).json({ message: 'Plot held successfully', plot });
  } catch (error) {
    res.status(500).json({ message: 'Error holding plot', error: error.message });
  }
};

// 5. Hold MULTIPLE plots

exports.holdMultiplePlots = async (req, res) => {
  try {
    const { plotIds } = req.body;
    if (!plotIds || !Array.isArray(plotIds)) {
      return res.status(400).json({ message: "Invalid plot IDs" });
    }

    const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    // Ellame Available-a irukka nu mudhalla check pandrom
    const plots = await Plot.find({ _id: { $in: plotIds } });
    const unavailable = plots.find(p => p.status !== 'Available');
    if (unavailable) {
      return res.status(400).json({ message: `Plot ${unavailable.plotNumber} is not available` });
    }

    // Ellathayum Hold-ku maathuvom
    await Plot.updateMany(
      { _id: { $in: plotIds } },
      { status: 'Hold', holdExpiresAt: expiryTime }
    );

    // 🚀 Update aana plots-ah thirumba fetch pandrom (holdExpiresAt irukka nu check pandrom)
    const updatedPlots = await Plot.find({ _id: { $in: plotIds } });

    // Send response
    res.status(200).json({ message: 'Plots held successfully', plots: updatedPlots });
  } catch (error) {
    res.status(500).json({ message: 'Error holding plots', error: error.message });
  }
};

// Update Plot (Position, Price, Size)
exports.updatePlot = async (req, res) => {
  try {
    const { x, y, size, price } = req.body;
    const plot = await Plot.findByIdAndUpdate(
      req.params.id,
      { x, y, size, price },
      { new: true }
    );
    if (!plot) return res.status(404).json({ message: 'Plot not found' });
    res.status(200).json(plot);
  } catch (error) {
    res.status(500).json({ message: 'Error updating plot', error: error.message });
  }
};
