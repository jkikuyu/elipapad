/**
 * @author Jude
 * date 31/5/2018 * 
 */
class PaymentRequest {
    constructor(requestid, type,amount, requestxml, status, requestedby, responsexml) {
        this.requestid = requestid;
        this.type = type  ;
        this.amount = amount;
        this.requestxml= requestxml;
        this.status = status ;
        this.requestedby= requestedby;
        this.responsexml = responsexml;
    }
}
module.exports=PaymentRequest
