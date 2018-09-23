function errorHandler(error, request, response, next){
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Oops! Something went wrong"
        }
    });

}

module.exports = errorHandler;


//purpose of this is to make a function that will respond
//with the status of the error or a custom message