class PaymentRequest {
    constructor(requestid, type,amount, requestxml, status, requestedby) {
        requestid = this.requestid;
        type    = this.type;
        amount = this.amount;
        requestxml= this.requestxml;
        status =this.status;
        requestedby = this.requestedby;
    }
}

module.exports = PaymentRequest;

