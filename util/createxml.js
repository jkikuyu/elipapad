var SerialPort = require('serialport');
var parseString = require('xml2js').parseString;
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
        return true;
        });
    },
    padresponse: function(){
        port.on('readable', function () {
            resp =  port.read();
          });    
    }
};

