const express = require('express');
const router = express.Router();

// 🚀 Inga ovvoru function-um onnu onna dhaan import aaganum
const {
  getPlots,
  getPlotById,
  createPlot,
  holdPlot,
  holdMultiplePlots,
  updatePlot
} = require('../controllers/plotController');

// Routes
router.post('/', createPlot);
router.put('/hold-multiple', holdMultiplePlots);
router.get('/single/:id', getPlotById);
router.put('/update/:id', updatePlot);
router.put('/:id/hold', holdPlot);
router.get('/:projectId', getPlots);

module.exports = router;