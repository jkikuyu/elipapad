/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();
const payroute = require('./api/payroute')

/* API routes */
router.use('/v1', payroute);
router.use('/index', payroute);

module.exports = router;