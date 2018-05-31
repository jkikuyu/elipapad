var SerialPort = require('serialport');
var parseString = require('buffer');
var port = new SerialPort('COM3', {
  baudRate: 9600
});
var resp;
var padinteract = {
padrequest: function(xml) {

    port.write(xml,function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        
        port.on('data', (data) => {
           
            console.log(data.toString("utf8"));
        });
        return true;
        });
    },
    padresponse: function(){
        port.on('readable', function () {
            resp =  port.read();
          });    
    }
};
module.exports=padinteract
