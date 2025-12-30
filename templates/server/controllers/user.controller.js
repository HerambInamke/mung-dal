const userService = require('../services/user.service');
const { ApiResponse } = require('../utils/apiResponse');

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await userService.getAllUsers({ page, limit, search });
    
    return ApiResponse.success(res, result, 'Users retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    return ApiResponse.success(res, { user }, 'User retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await userService.updateUser(id, updates);
    
    return ApiResponse.success(res, { user }, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    
    return ApiResponse.success(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const user = await userService.updateUser(userId, updates);
    
    return ApiResponse.success(res, { user }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile,
};