
const express = require("express"),
	 bodyParser = require("body-parser"),
	 nexe = require("nexe"),
	 ejs = require("ejs"),
	 Service = require('node-windows').Service,
   cors = require("cors");

/* Database configuration */
const database = require('./config/dbconfig');
 

const padreq = express();
padreq.use(cors());
padreq.set("view engine", "ejs");
padreq.use(bodyParser.urlencoded({ extended: true }));
padreq.use(bodyParser.json());
database.init();

// const parameters = {
// 	amount: 1000,
// 	curr : ['KES','USD']
// }

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
// svc.uninstall(); 


padreq.get("/", (req, res) => {
	res.render("index");
});

padreq.post("http://localhost:8082/api/v1/elipapad/purchase", (req, res) => {
	res.send({
		amount: req.body.amount,
		curr: req.body.curr
	});
});

// padreq.post('https://ipay-staging.ipayafrica.com/backoffice-togo/public/index.php/api/pos', (req,res)=>{
// 	res.send({
// 		txncode:"B2B20181119181290",
// 		desc:"LAICO",
// 		amount:req.body.amount,
// 		curr:req.body.curr
// 	})
// })

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

