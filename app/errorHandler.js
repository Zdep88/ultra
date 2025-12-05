const httpErrorDictionnary = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    500: 'Internal Server Error',
    501: 'Not Implemented',
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