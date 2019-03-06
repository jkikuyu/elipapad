/**
 * @author Jude
 * date 31/5/2018 * 
 */
/**
 * @author Jude
 * date 31/5/2018 * 
 */
class PaymentResponse {
    constructor(responseid, requestid, responsexml, date, tillid, status) {
        this.responseid = responseid;
        this.requestid = requestid;
        this.responsexml = responsexml;
        this.date = date  ;
        this.tillid = tillid;
        this.status = status ;
    }
}
module.exports=PaymentResponse