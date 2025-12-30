const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { userSchema } = require('../validators');

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// User's own profile
router.put('/profile', validate(userSchema.updateProfile), userController.updateProfile);

// Admin only routes
router.get('/', adminMiddleware, userController.getAllUsers);
router.get('/:id', adminMiddleware, userController.getUserById);
router.put('/:id', adminMiddleware, validate(userSchema.update), userController.updateUser);
router.delete('/:id', adminMiddleware, userController.deleteUser);

module.exports = router;