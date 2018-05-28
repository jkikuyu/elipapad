/* Load Modules */

const express = require('express');
const router = express.Router();
/* Load controller */
const PaymentRequestController = require('../../controller/paymentrequestcontroller');
const paymentRequestController = new PaymentRequestController();
router.get('/purchase', function (req, res) {
    paymentRequestController.makerequest(req, res);
});
module.exports = router;