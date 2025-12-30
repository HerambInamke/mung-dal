const Joi = require('joi');

const update = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Please provide a valid email',
  }),
  avatar: Joi.string().uri().allow(null, '').messages({
    'string.uri': 'Avatar must be a valid URL',
  }),
  isActive: Joi.boolean(),
}).min(1);

const updateProfile = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters',
  }),
  avatar: Joi.string().uri().allow(null, '').messages({
    'string.uri': 'Avatar must be a valid URL',
  }),
}).min(1);

module.exports = {
  update,
  updateProfile,
};