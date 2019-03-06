
// Load PaymentRequest Data Access Object 
const PaymentRequestDao = require('../dao/paymentrequestdao');
const PaymentResponseDao = require('../dao/paymentresponsedao');


// Load Controller Common function 
const ControllerCommon = require('./common/controllercommon');
const  events = require('events');

// Load PaymentRequest entity 
const PaymentRequest = require('../model/paymentrequest');
const PaymentResponse = require('../model/paymentresponse');


const pinpad= require("../util/pinpad");

const stringToXml = require('xml2js');

const fetch = require('node-fetch');

const path = require('path');

/**
 * @author Jude
 * date 6/6/2018
 * 
 */
class PaymentRequestController {

    constructor() {
        this.PaymentRequestDao = new PaymentRequestDao();
        this.PaymentResponseDao = new PaymentResponseDao();
        this.common = new ControllerCommon();
    }
    tillRequest(req, res) {
        let paymentrequest= new PaymentRequest();
        let responsexml = null;
        let userName = process.env['USERPROFILE'].split(path.sep)[2];
        let loginId = path.join("domainName",userName);
        console.log(loginId);
        paymentrequest.amount = req.query.amount;
        console.log(paymentrequest.amount);
        let requestxml = "\r\n<request>\r\n\t<command>purchase</command>\r\n\t<amount>" + 
        paymentrequest.amount + "</amount>\r\n</request>";
        let datetime = new Date().toLocaleString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '') 
        let requestId = 0;

        paymentrequest.status = 1;
        paymentrequest.type = 1;
        paymentrequest.requestxml= requestxml;
        paymentrequest.date = datetime;
    
        this.PaymentRequestDao.create(paymentrequest).then(out=>{
            requestId = out;
            console.log("request id: " + requestId);
        });
        pinpad.padrequest(requestxml).then(resultxml=>{
           console.log(resultxml.substr(1, resultxml.indexOf('>')-1));
           let tagName = resultxml.substr(1, resultxml.indexOf('>')-1);
            if(tagName=="pinpadStatusResponse"){

            /**this.convertoXmlToObj(resultxml).then(obj=>{
                console.log(obj);
                console.log(obj.pinpadStatusResponse['responseCode'][0]);
            
                if(obj.pinpadStatusResponse['responseCode'][0]== "06"){
            **/
                let json = {"messagecode":"001","message":"cancelled"};
                res.json(json);
            }
            else{   
                   // console.log("update response....");
                   let paymentresponse = new PaymentResponse();
                   let datetime = new Date().toLocaleString().
                   replace(/T/, ' ').      // replace T with a space
                   replace(/\..+/, '') 

                    paymentresponse.requestid = requestId;
                    paymentresponse.date = datetime;
                    paymentresponse.status = 1;
                    paymentresponse.tillid="0001";

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
                        fetch(url, options)
                            .then(responsexml => responsexml.text())
                            .then(responsexml => {
                                console.log('response ' + responsexml);
                                paymentresponse.responsexml = responsexml;
                                this.PaymentResponseDao.create(paymentresponse);
                                if(responsexml.substr(responsexml.indexOf('<field39>')+9,2 )=="00"){
                                    

                                    let json = {"messagecode":"000","message":"success"};
                                    res.json(json);
                                }
                                else{
                                    let json = {"messagecode":'002',"message":"failed"};
                                    res.json(json);

                                }

                            }).catch(error=>{
                                console.log("error message " +error);
                            });
    
                        /*  request(options, function(err, res, body) {  
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

            });
        
        //});
    }

        /**
     * conert xml to js object and return result
     * @param {*} xml 
     */
    convertoXmlToObj(xml){
        //console.log("convert xml to object");
        return new Promise(function (resolve, reject) {
            stringToXml.parseString(xml,function(err,xmlobj){
                if(err){
                    console.error(err);
                    reject(err);
                }
                else{
                    resolve(xmlobj);
                }
            });

        });
    }
     
}
module.exports = PaymentRequestController;