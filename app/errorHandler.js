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
    
    typeError(error) {
        if (!error.status) {
            console.error("Error without status :");
            console.error(error);
            error.status = 500;
            error.message = httpErrorDictionnary[500];
        }
        if (!error.message) {
            error.message = httpErrorDictionnary[error.status] || 'An unexpected error occurred';
        }
    },
    
    errorBack: (err, req, res, next) => {
        errorHandler.typeError(err);
        res.status(err.status).json({
            statusCode: err.status,
            error: err.message,
        });
    },

    errorFront: (err, req, res, next) => {
        errorHandler.typeError(err);
        res.status(err.status).send(`
            <h1>Error ${err.status}</h1>
            <p>${err.message}</p>
        `);
    }
}

export default errorHandler;