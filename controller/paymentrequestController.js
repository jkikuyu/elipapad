
// Load PaymentRequest Data Access Object 
const PaymentRequestDao = require('../dao/paymentrequestdao');

// Load Controller Common function 
const ControllerCommon = require('./common/controllercommon');
const  events = require('events');

// Load PaymentRequest entity 
const PaymentRequest = require('../model/paymentrequest');

const pinpad= require("../util/pinpad");

const stringToXml = require('xml2js').parseString;

const fetch = require('node-fetch');
/**
 * @author Jude
 * date 6/6/2018
 * 
 */
class PaymentRequestController {

    constructor() {
        this.PaymentRequestDao = new PaymentRequestDao();
        this.common = new ControllerCommon();

    }
    tillRequest(req, res) {
        let paymentrequest= new PaymentRequest();
        let responsexml = null;
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
            stringToXml.parseString(resultxml,)

            if()
            let url = 'https://qa.interswitchng.com/kmw/v2/kimonoservice/kenya';
            const options = {
                method: 'POST', 
                mode: 'cors', 
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/xml'
                },
                body:resultxml
            };
            try{
                fetch(url, options)
                    .then(response => response.text())
                    .then(response => {
                        console.log(response);
                    });

    /*            request(options, function(err, res, body) {  
                    console.error('Error on write: ', err.message);
                    console.log(body);
                    responsexml = body;
                    responsexml.replace(/\r?\n|\r/|/\s/g,'')
                    paymentrequest.responsexml = responsexml;
                    this.PaymentRequestDao.update(paymentrequest);
                    console.log(body);
                    convertXmlToObj(responsexml);
                    let json = '{"message":success, "messagecode":"000"}';
                    res.json(json);
            
                }); 
    */
            }
            catch(error){
                console.error(error);
            }

        });
    }
    /**
     * conert xml to js object and return result
     * @param {*} xml 
     */
    convertoXmlToObj(xml){
        
        stringToXml.parseString(xml,function(err,xmlobj){
            if(err){
                console.error(err);
            }
            else{
                return xmlobj;
            }
        });

    }
    
     
}
module.exports = PaymentRequestController;