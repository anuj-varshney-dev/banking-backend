class ApiError extends Error {  //ApiError inherits from Error.
    constructor(statusCode, message) {
              super(message);  // calling the constructor of the parent (Error) class.
                this.statusCode = statusCode;
    }
}

export default ApiError;