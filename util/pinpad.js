/**
 * @author Jude
 * date 28/5/2018 * 
 * class to connect to pinpad. Write a message and get response.
 */
const SerialPort = require('serialport');

require('dotenv').load();

const parseString = require('buffer');
const PaymentRequestDao = require('../dao/paymentrequestdao');
const cerror = require('../util/global');
const serialname=process.env.SERIAL;
let port = 0;
const exists = portName => SerialPort.list().then(ports => ports.some(port => port.comName === portName ));
exists(serialname).then(res => res? port = new SerialPort(serialname, {baudRate: 9600}):padinteract.padExit());
//var port = new SerialPort(serialname, {baudRate: 9600});
var resp;
var padinteract = {
padrequest: function(xml) {
    return new Promise((resolve, reject)=>{
    // console.log(xml);
        port.write(xml,function(err) {
            if (err) {
                //errorLog.error("Error Message: {$err}")
                reject(err);
            }
        });
            
        port.once('data', (data) => {
            
            var result= data.toString("utf8");
                resolve(result);
        });
        port.once('error', (err) => {
            reject(err);
        });

    });
},
padExit:function(){
    console.log(serialname + " is not connected. Please connect pinpad to " + serialname);
    process.exit(1);
},
padresponse: function(){
    port.on('readable', function () {
        resp =  port.read();
        });    
},
    processResult: function(responsexml,paymentrequest,res){
        responsexml= responsexml.replace(/(\r\n|\n|\r|\r\n\t|\s)/gm,"");
        console.log(res);
        var pos = responsexml.indexOf("<responseCode>");
        if(pos >0){
            return res.send("transaction cancelled");
        }
        else{
            paymentRequestDao = new PaymentRequestDao();
                paymentrequest.responsexml = responsexml;
                console.log(responsexml);

/*                 paymentRequestDao.create(paymentrequest)
                    .then(paymentRequestDao.editSuccess(res))
                    .catch(paymentRequestDao.serverError(res));

 */                const options = {
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
            }
        }
};
module.exports=padinteract
