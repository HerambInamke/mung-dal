const express = require('express');
const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { authSchema } = require('../validators');

const router = express.Router();

router.post('/register', validate(authSchema.register), authController.register);
router.post('/login', validate(authSchema.login), authController.login);
router.post('/refresh', validate(authSchema.refresh), authController.refreshToken);
router.post('/logout', validate(authSchema.logout), authController.logout);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;