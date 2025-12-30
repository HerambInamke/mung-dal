const jwt = require('jsonwebtoken');
const config = require('../config');
const { ApiError } = require('../utils/apiResponse');

const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
  };

  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpire,
  });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new ApiError('Invalid or expired access token', 401);
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    throw new ApiError('Invalid or expired refresh token', 401);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};