const express = require('express');
const router = express.Router();
const { toggleFavourite, getMyFavourites } = require('../controllers/favouriteController');

router.post('/', toggleFavourite);
router.get('/', getMyFavourites);

module.exports = router;