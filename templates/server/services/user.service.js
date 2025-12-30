const { User } = require('../models');
const { ApiError } = require('../utils/apiResponse');

const getAllUsers = async ({ page = 1, limit = 10, search = '' }) => {
  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password -refreshToken')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),
    User.countDocuments(query),
  ]);

  return {
    users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return user;
};

const updateUser = async (userId, updates) => {
  // Don't allow updating password or role through this method
  const { password, role, ...safeUpdates } = updates;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: safeUpdates },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};