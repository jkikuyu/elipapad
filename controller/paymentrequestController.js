/* Load PaymentRequest Data Access Object */
const PaymentRequestDao = require('../dao/paymentrequestdao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllercommon');

/* Load PaymentRequest entity */
let PaymentRequest = require('../model/paymentrequest');


let createxml = require("../util/createxml");
/**
 * Payment Request Controller
 */
class PaymentRequestController {

    constructor() {
        this.PaymentRequestDao = new PaymentRequestDao();
        this.common = new ControllerCommon();

    }


    makePayment(req, res) {
        let paymentrequest= new PaymentRequest();
        
        paymentrequest.amount = req.query.amount;
        console.log(paymentrequest.amount);
        let requestxml = "\r\n<request>\r\n\t<command>purchase</command>\r\n\t<amount>" + 
        paymentrequest.amount + "</amount>\r\n</request>";
        let datetime = new Date().toLocaleString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '') 
        paymentrequest.status = 1;
        paymentrequest.type = 1;
        paymentrequest.requestxml= requestxml;
        paymentrequest.date = datetime;
        console.log(paymentrequest.date);

        this.PaymentRequestDao.create(paymentrequest)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
        //let createxml = new CreateXml();
        createxml.padrequest(requestxml);
        //let xmlResponse = createxml.padresponse();
        //console.log(xmlResponse);
     }
}

    module.exports = PaymentRequestController;