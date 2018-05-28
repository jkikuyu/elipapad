/* Load modules */
const sqlite3 = require('sqlite3').verbose();

/* Load database file (Creates file if not exists) */

let db = new sqlite3.Database('../db/elipapad.db');

let init = function () {
    db.run("CREATE TABLE if not exist paymentrequest (" +
        "`requestid` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "`type` CHARACTER ( 1 ) NOT NULL, `amount` NUMERIC ( 8 , 2 ) NOT NULL," +
        "`requestxml` TEXT ( 100 ), `status` INTEGER ( 1 ) NOT NULL," +
        "`requestedby` INTEGER, `date` TEXT NOT NULL )");

    db.run("CREATE TABLE if not exist `paymentresponse` (" +
        "`reponseid` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " `requestid` INTEGER NOT NULL, `responsexml` TEXT(1000),"+
        " `date` TEXT, `status` INTEGER(1) )");
};

module.exports = {
    init: init,
    db: db
};
