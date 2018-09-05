/**
 * @author Jude
 * date 31/5/2018 * 
 */
/**
 * @author Jude
 * date 31/5/2018 * 
 */
class PaymentResponse {
    constructor(responseid, requestid, responsexml, date, status) {
        this.responseid = responseid;
        this.requestid = requestid;
        this.responsexml = responsexml;
        this.date = date  ;
        this.status = status ;
    }
}
module.exports=PaymentRequest