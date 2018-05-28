/* Load PaymentRequest Data Access Object */
const PaymentRequestDao = require('../dao/paymentrequestdao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllercommon');

/* Load PaymentRequest entity */
const PaymentRequest = require('../model/paymentrequest');


var padinteract = require("../util/createxml");
/**
 * Payment Request Controller
 */
class PaymentRequestController {

    constructor() {
        this.PaymentRequestDao = new PaymentRequestDao();
        this.common = new ControllerCommon();
    }


    makePayment(req, res) {
        let PaymentRequest = new PaymentRequest();
        if (req.body.amount) {
            PaymentRequest.amount = req.body.amount;
        }
        let requestxml = "\r\n<request>\r\n\t<command>purchase</command>\r\n\t<amount>" + 
        PaymentRequest.amount + "</amount>\r\n</request>";

        PaymentRequest.status = 1;
        PaymentRequest.type;
        PaymentRequest.requestxml= requestxml;
       
        this.PaymentRequestDao.create(PaymentRequest)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
        padinteract.padrequest(requestxml);
        let xmlResponse = padinteract.padresponse();
        console.log(xmlReponse);
    }
}

    module.exports = PaymentRequestController;