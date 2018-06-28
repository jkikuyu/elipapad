/* Load PaymentRequest Data Access Object */
const PaymentRequestDao = require('../dao/paymentrequestdao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllercommon');
const  events = require('events');


/* Load PaymentRequest entity */
let PaymentRequest = require('../model/paymentrequest');


let pinpad= require("../util/pinpad");
//var promise = require('promise');
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
        this.PaymentRequestDao.create(paymentrequest);
        pinpad.padrequest(requestxml).then((resultxml)=>{
            console.log(resultxml);
            const options = {
                url: 'https://qa.interswitchng.com/kmw/v2/kimonoservice/kenya',
                method: 'POST', 
                mode: 'cors', 
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/xml'
                },
                body:responsexml
            };
            request(options, function(err, res, body) {  
                console.log(body);
                
            }); 



        });

        //let createxml = new CreateXml();
         }
 /*         
         var responsexml = eventEmitter.on('result', lstnr);
        eventEmitter.emit('result');
        
        

            resultxml.replace(/\r?\n|\r/|/\s/g,'')
            paymentrequest.responsexml = resultxml;
            this.PaymentRequestDao.update(paymentrequest);
            var request = new Request('https://qa.interswitchng.com/kmw/v2/kimonoservice/kenya', {
                method: 'POST', 
                mode: 'cors', 
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'text/xml'
                }),
                body:responsexml
            });
            fetch(request).then(function(response) {
                console.log(response);
        
            }).catch(function(err) {
            // Error :(
            });
 */    

  //      })
       // responsexml.replace(/\s/g, '');


     
}


    module.exports = PaymentRequestController;