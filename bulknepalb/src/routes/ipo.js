const express = require('express');
const router = express.Router();

const { getIPOs } = require('../controllers/cdsc/ipo');

router.post('/open/:for', getIPOs);

module.exports = router;