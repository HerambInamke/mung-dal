const { User, Session } = require('../models');
const tokenService = require('./token.service');
const { ApiError } = require('../utils/apiResponse');

const register = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError('Email already registered', 400);
  }

  // Create user
  const user = await User.create({ name, email, password });

  // Generate tokens
  const accessToken = tokenService.generateAccessToken(user);
  const refreshToken = tokenService.generateRefreshToken(user);

  // Create session
  await Session.create({
    userId: user._id,
    refreshToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const login = async ({ email, password, userAgent, ipAddress }) => {
  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError('Invalid email or password', 401);
  }

  // Check if user is active
  if (!user.isActive) {
    throw new ApiError('Account is deactivated', 403);
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError('Invalid email or password', 401);
  }

  // Generate tokens
  const accessToken = tokenService.generateAccessToken(user);
  const refreshToken = tokenService.generateRefreshToken(user);

  // Create session
  await Session.create({
    userId: user._id,
    refreshToken,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError('Refresh token is required', 400);
  }

  // Verify refresh token
  const decoded = tokenService.verifyRefreshToken(refreshToken);

  // Find valid session
  const session = await Session.findOne({
    refreshToken,
    isValid: true,
    expiresAt: { $gt: new Date() },
  });

  if (!session) {
    throw new ApiError('Invalid or expired refresh token', 401);
  }

  // Find user
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) {
    throw new ApiError('User not found or inactive', 401);
  }

  // Generate new access token
  const accessToken = tokenService.generateAccessToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError('Refresh token is required', 400);
  }

  // Invalidate session
  await Session.updateOne(
    { refreshToken },
    { isValid: false }
  );

  return true;
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return user;
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
  getProfile,
};