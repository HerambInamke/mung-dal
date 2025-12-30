require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-this',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-change-this',
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',
};