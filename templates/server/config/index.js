const db = require('./db');
const env = require('./env');

module.exports = {
  db,
  ...env,
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  },
};

// templates/server/.env.example 
NODE_ENV=development
PORT=5000

// Database

// MONGODB_URI=mongodb://localhost:27017/mern-app(UnComment this line and add your own MongoDB URI)

//  JWT
// JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
// JWT_EXPIRE=7d
// JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
// JWT_REFRESH_EXPIRE=30d

// Client URL

//CLIENT_URL=http://localhost:3000 
