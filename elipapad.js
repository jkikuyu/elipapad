
const express = require("express"),
	 bodyParser = require("body-parser"),
	 nexe = require("nexe"),
	 Service = require('node-windows').Service;

/* Database configuration */
const database = require('./config/dbconfig');

const padreq = express();
database.init();

//create the .exe file
nexe.compile({
    flags: true, 
    input: "elipapad.js",
    output: "ipayafrica",
    nodeVersion: "v10.16.0",
    nodeTempDir: "nexe_node",
    framework: "node",
    resourceFiles: []
  },
  (error) => {
    if (error) {
      return console.error(error.message)
    }
  }
);


//running the code on windows as a service
// Create a new service object
var svc = new Service({
  name:'Elipapad',
  description: 'NodeJS implementation that allows a user to make payments using a pinpad via the iPay payment gateway.',
  script: 'C:\\Users\\ipayafrica\\Documents\\NodeSample\\elipapad\\elipapad.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

//------UNINSTALLING THE SERVICE------//
// Listen for the "uninstall" event so we know when it's done.
// svc.on('uninstall',function(){
//   console.log('Uninstall complete.');
//   console.log('The service exists: ',svc.exists);
// });

// Uninstall the service.
// svc.uninstall();

const port = process.argv[2] || 8082;
padreq.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/* Express configuration 
padreq.use(bodyParser.urlencoded({extended: false}));
padreq.use(bodyParser.json());
*/
/* Router configuration */
const REST_API_ROOT = '/api';
padreq.use(REST_API_ROOT, require('./route/router'));

