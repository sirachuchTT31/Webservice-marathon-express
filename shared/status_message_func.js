const http_status =  require('http-status-codes')
message_error =
{
    message_error_400: {
        status: false,
        status_code: http_status.StatusCodes.BAD_REQUEST,
        message: http_status.ReasonPhrases.BAD_REQUEST,
        result: null,
    },

    message_error_500: {
        status: false,
        status_code: http_status.StatusCodes.INTERNAL_SERVER_ERROR,
        message: http_status.ReasonPhrases.INTERNAL_SERVER_ERROR,
        result: null
    },
    message_error_401: {
        status: false,
        status_code: http_status.StatusCodes.UNAUTHORIZED	,
        message: http_status.ReasonPhrases.UNAUTHORIZED,
        result: null
    },
    message_error_204 : {
        status: true,
        status_code: http_status.StatusCodes.NO_CONTENT,
        message: http_status.ReasonPhrases.NO_CONTENT,
        result: null
    }
}


module.exports = message_error