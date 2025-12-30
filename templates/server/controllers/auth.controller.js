const authService = require('../services/auth.service');
const { ApiResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register({ name, email, password });
    
    logger.info(`New user registered: ${email}`);
    return ApiResponse.success(res, result, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    
    const result = await authService.login({ email, password, userAgent, ipAddress });
    
    logger.info(`User logged in: ${email}`);
    return ApiResponse.success(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);
    
    return ApiResponse.success(res, result, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    
    logger.info(`User logged out: ${req.user.email}`);
    return ApiResponse.success(res, null, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    return ApiResponse.success(res, { user }, 'Profile retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
};