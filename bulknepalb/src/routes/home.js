const express = require('express');
const router = express.Router();
const { getMarketStatus, getLiveMarketData } = require('../controllers/market/home');

router.get('/status', getMarketStatus);
router.get('/indices', getLiveMarketData);

module.exports = router;
