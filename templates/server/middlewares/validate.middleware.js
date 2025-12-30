const { ApiError } = require('../utils/apiResponse');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return next(new ApiError('Validation failed', 400, errors));
    }

    next();
  };
};

module.exports = { validate };