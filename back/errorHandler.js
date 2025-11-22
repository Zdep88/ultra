const httpErrorDictionnary = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    418: 'I\'m a teapot',
    500: 'Internal Server Error',
}

const errorHandler = {
    notFound(req, res, next) {
        errorHandler.throwError(404);
    },

    throwError(status, message = "") {
        const error = new Error(message);
        error.status = status;
        throw error;
    },

    internalServerError(err, req, res, next) {
        if (!err.status) {
            console.error("Error without status :");
            console.error(err);
            err.status = 500;
            err.message = httpErrorDictionnary[500];
        }
        if (!err.message) {
            err.message = httpErrorDictionnary[err.status] || 'An unexpected error occurred';
        }
        res.status(err.status).json({
            statusCode: err.status,
            error: err.message,
        });
    }
}

export default errorHandler;