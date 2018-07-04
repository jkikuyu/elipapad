/**
 * https://stackoverflow.com/questions/32032588/how-to-return-from-a-promises-catch-then-block
 * https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/5251506#5251506
 * http://jsfiddle.net/q04p3gks/13/
 * @param {*} message 
 */
function genericException(message) {
    this.name = 'commonException';
    this.message = message;
    this.stack = (new Error()).stack;
}
function fError(error) {
	// if ((+error.message || 0) < 0) { // <<<<< must be a reliable test for a previous error
	if (error instanceof genericException) {
		throw error;
	} else {
		console.log("generic error" + error);
	}
}
genericException.prototype = new Error; 