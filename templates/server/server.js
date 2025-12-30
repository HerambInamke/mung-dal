const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const routes = require('./routes');
const { errorMiddleware } = require('./middlewares/error.middleware');
const logger = require('./utils/logger');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorMiddleware);

// Start server
const PORT = config.port || 5000;

async function startServer() {
  try {
    await config.db.connect();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;