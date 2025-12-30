const logger = require('../utils/logger');
const { ApiError, ApiResponse } = require('../utils/apiResponse');

const errorMiddleware = (err, req, res, next) => {
  // Log error
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // Handle ApiError
  if (err instanceof ApiError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return ApiResponse.error(res, 'Validation Error', 400, errors);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return ApiResponse.error(res, `${field} already exists`, 400);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error(res, 'Token expired', 401);
  }

  // Default error
  return ApiResponse.error(
    res,
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    500
  );
};

module.exports = { errorMiddleware };