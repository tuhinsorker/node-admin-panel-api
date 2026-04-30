const successResponse = (res, data, message = 'Success') => {
    res.json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message: error.message || 'An unexpected error occurred'
    });
};

module.exports = {
    successResponse,
    errorResponse
};