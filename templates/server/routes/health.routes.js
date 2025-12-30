const express = require('express');
const mongoose = require('mongoose');
const { ApiResponse } = require('../utils/apiResponse');

const router = express.Router();

router.get('/', (req, res) => {
  const health = {
    uptime: process.uptime(),
    message: 'Server is running',
    timestamp: Date.now(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  };

  return ApiResponse.success(res, health, 'Health check successful');
});

module.exports = router;