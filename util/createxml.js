var SerialPort = require('serialport');
var parseString = require('buffer');
const PaymentRequestDao = require('../dao/paymentrequestdao');
const request = require('request');

var port = new SerialPort('COM3', {
  baudRate: 9600
});
var resp;
var padinteract = {
padrequest: function(xml,paymentrequest,res) {
    console.log(xml);
    port.write(xml,function(err) {
        if (err) {
            console.log('Error on write: ', err.message);
            return null;
        }
        
        port.on('data', (data) => {
           
           var result= data.toString("utf8");
           padinteract.processResult(result,paymentrequest,res);
            

        });
        });
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
