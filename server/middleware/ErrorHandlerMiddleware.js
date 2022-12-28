const ApiError = require("../error/ApiError");
const { HTTP_STATUS } = require("../helpers/httpStatuses");

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    
    return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500)
    .json({ message: "Unexpected error" });
};

module.exports = errorHandler
