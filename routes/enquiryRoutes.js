const express = require('express');
const router = express.Router();
const { createEnquiry, getSellerEnquiries } = require('../controllers/enquiryController');

router.post('/', createEnquiry);
router.get('/', getSellerEnquiries);

module.exports = router;