const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB Disconnected');
  } catch (error) {
    logger.error('MongoDB disconnection error:', error);
    throw error;
  }
};

module.exports = { connect, disconnect };