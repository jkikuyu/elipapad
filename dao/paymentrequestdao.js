/* Load Car entity */
const paymentrequest = require('../model/paymentrequest');

/* Load DAO Common functions */
const daoCommon = require('./common/daoCommon');
class PaymentRequestDao {
    update(PaymentRequest) {
        let sqlRequest = "UPDATE paymentrequest SET " +
            "type=$type, " +
            "amount=$amount, " +
            "requestxml=$requestxml, " +
            "status=$status, " +
            "requestedby=$requestedby, " +
            "WHERE paymentrequestid=$paymentrequestid";

    
        let sqlParams = {
            $type : PaymentRequest.type,
            $amount : PaymentRequest.amount,
            $requestxml: PaymentRequest.requestxml,
            $status : PaymentRequest.status,
            $requestedby : PaymentRequest.requestedby
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Car
     * returns database insertion status
     */
    create(PaymentRequest) {
        let sqlRequest = "INSERT into paymentrequest" + 
        "(requestid, type,amount, requestxml, status, requestedby) " +
        "VALUES ($requestid, $type, $amount, $requestxml, $status, $requestedby)";
        let sqlParams = {
            $type    : PaymentRequest.type,
            $amount : PaymentRequest.amount,
            $requestxml: PaymentRequest.requestxml,
            $status : PaymentRequest.status,
            $requestedby : PaymentRequest.requestedby
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