const paymentrequest = require('../model/paymentrequest');

/* Load DAO Common functions */
const daoCommon = require('./common/daocommon');
class PaymentRequestDao {
    constructor() {
        this.common = new daoCommon();
    }

    update(paymentrequest) {
        let sqlRequest = "UPDATE paymentrequest SET " +
            "type=$type, " +
            "amount=$amount, " +
            "requestxml=$requestxml, " +
            "status=$status, " +
            "date=$date, " +
            "requestedby=$requestedby, " +
            "WHERE requestid=$requestid";

            let sqlParams = {
                $type    : paymentrequest.type,
                $amount : paymentrequest.amount,
                $requestxml: paymentrequest.requestxml,
                $status : paymentrequest.status,
                $date:    paymentrequest.date,
                $requestedby : paymentrequest.requestedby,
                $responsexml : paymentrequest.responsexml,
                $requestid : paymentrequest.requestid

            };
    
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params paymentrequest
     * returns database insertion status
     */
    create(paymentrequest) {
        let sqlRequest = "INSERT into paymentrequest" + 
        "(type,amount, requestxml, date, status, requestedby) " +
        "VALUES ($type, $amount, $requestxml,$date, $status, $requestedby)";
        let sqlParams = {
            $type    : paymentrequest.type,
            $amount : paymentrequest.amount,
            $requestxml: paymentrequest.requestxml,
            $status : paymentrequest.status,
            $date:    paymentrequest.date,
            $requestedby : paymentrequest.requestedby
        };
        return this.common.run(sqlRequest, sqlParams);
    };
    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM paymentrequest WHERE paymentrequestid=$paymentrequestid";
        let sqlParams = {$paymentrequestid: paymentrequestid};
        return this.common.run(sqlRequest, sqlParams);
    };

}

module.exports = PaymentRequestDao;