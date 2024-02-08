message_error =
{
    message_error_400: {
        status: false,
        status_code: 400,
        message: "Bad request",
        result: null,
    },

    message_error_500: {
        status: false,
        status_code: 500,
        message: "Internal Server Error",
        result: null
    },
    message_error_401: {
        status: false,
        status_code: 401,
        message: "HTTP 401 Unauthorized Error",
        result: null
    },
    message_error_204 : {
        status: true,
        status_code: 204,
        message: "No content",
        result: null
    }
}


module.exports = message_error