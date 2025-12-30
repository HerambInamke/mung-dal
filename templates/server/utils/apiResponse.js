class ApiError extends Error {
    constructor(message, statusCode = 500, errors = null) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class ApiResponse {
    static success(res, data = null, message = 'Success', statusCode = 200) {
      return res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    }
  
    static error(res, message = 'Error', statusCode = 500, errors = null) {
      const response = {
        success: false,
        message,
      };
  
      if (errors) {
        response.errors = errors;
      }
  
      return res.status(statusCode).json(response);
    }
  }
  
  module.exports = { ApiError, ApiResponse };