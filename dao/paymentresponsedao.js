const paymentresponse = require('../model/paymentresponse');

/* Load DAO Common functions */
const daoCommon = require('./common/daocommon');
class PaymentResponseDao {
    constructor() {
        this.common = new daoCommon();
    }
    update(paymentresponse) {
        let sqlResponse = "UPDATE paymentresponse SET " +
            "amount=$amount, " +
            "status=$status, " +
            "date=$date, " +
            "responsexml=$responsexml, " +
            "tillid =$tillid"
            "WHERE responsetid=$responseid";

            let sqlParams = {
                $requestid : paymentresponse.$requestid,
                $responseid :paymentresponse.responseid,
                $status : paymentresponse.status,
                $date:    paymentresponse.date,
                $responsexml : paymentresponse.responsexml,
                $tillid : paymentresponse.tillid
         

            };
    
        return this.common.run(sqlResponse, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params paymentrequest
     * returns database insertion status
     */
    create(paymentresponse) {
        let sqlResponse = "INSERT into paymentresponse" + 
        "(responseid, requestid, date, status, responsexml,tillid) " +
        "VALUES ($responseid, $requestid,$date, $status, $responsexml, $tillid)";
        let sqlParams = {
            $requestid : paymentresponse.requestid,
            $responseid :paymentresponse.responseid,
            $status : paymentresponse.status,
            $date:    paymentresponse.date,
            $responsexml : paymentresponse.responsexml,
            $tillid :paymentresponse.tillid
    };
        return this.common.run(sqlResponse, sqlParams);
    };
    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM paymentrequest WHERE paymentrequestid=$paymentrequestid";
        let sqlParams = {$paymentresponseid: paymentresponseid};
        return this.common.run(sqlResponse, sqlParams);
    };

}

module.exports = PaymentResponseDao;