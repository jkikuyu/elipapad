
const express = require("express");
const bodyParser = require("body-parser");
/* Database configuration */
const database = require('./config/dbconfig');

const padreq = express();
database.init();

const port = process.argv[2] || 3000;
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

