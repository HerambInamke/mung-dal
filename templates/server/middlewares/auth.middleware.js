const tokenService = require('../services/token.service');
const { User } = require('../models');
const { ApiError } = require('../utils/apiResponse');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError('Access token is required', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = tokenService.verifyAccessToken(token);

    // Get user from database
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      throw new ApiError('User not found or inactive', 401);
    }

    // Attach user to request
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ApiError('Access denied. Admin only.', 403));
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};