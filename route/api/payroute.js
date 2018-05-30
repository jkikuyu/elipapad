/* Load Modules */

const express = require('express');
const router = express.Router();
/* Load controller */
const PaymentRequestController = require('../../controller/paymentrequestcontroller');
const paymentRequestController = new PaymentRequestController();
router.get('/elipapad/:amount', function (req, res) {
    paymentRequestController.makePayment(req, res);
    res.send('About this wiki');
});
router.get('/', function (req, res) {
    //paymentRequestController.makePayment(req, res);
    res.send('hello world');
});
module.exports = router;