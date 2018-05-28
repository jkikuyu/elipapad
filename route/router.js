/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/payroute', require('./api/payroute'));

module.exports = router;