// api error handler

const { HTTP_STATUS } = require("../helpers/httpStatuses");

class ApiError extends Error {
  constructor(status, message) {
    super();
    this.message = message;
    this.status = status;
  }

  static badRequest(message) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST_400, message)
  }  
  
  static unauthorized(message) {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED_401, message)
  }

  static forbidden(message) {
    return new ApiError(HTTP_STATUS.FORBIDDEN_403, message)
  }
  
  static notFound(message) {
    return new ApiError(HTTP_STATUS.NOT_FOUND_404, message)
  }
  
  static internalError(message) {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR_500, message)
  }


}

module.exports = ApiError;