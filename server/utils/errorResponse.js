class ErrorResponse extends Error {
    constructor(message, statusCode){
        super(message)
        
        this.statusCode = this.statusCode
    }
}

module.exports = ErrorResponse;
