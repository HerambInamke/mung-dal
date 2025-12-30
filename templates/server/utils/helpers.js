`/**
 * Generate a random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
const generateRandomString = (length = 32) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  /**
   * Sleep for specified milliseconds
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise} Promise that resolves after ms
   */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  /**
   * Check if email is valid
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Sanitize user input
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized input
   */
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  };
  
  /**
   * Format date to readable string
   * @param {Date} date - Date to format
   * @returns {string} Formatted date
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  module.exports = {
    generateRandomString,
    sleep,
    isValidEmail,
    sanitizeInput,
    formatDate,
  };
  ```
  
  // ## Additional Files
  
  // **`templates/server/.gitignore`**:
  ```
  # Dependencies
  node_modules/
  
  # Environment variables
  .env
  .env.local
  .env.*.local
  
  # Logs
  logs/
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  
  # Runtime data
  pids
  *.pid
  *.seed
  *.pid.lock
  
  # Directory for instrumented libs
  lib-cov
  
  # Coverage directory
  coverage/
  *.lcov
  
  # nyc test coverage
  .nyc_output
  
  # Build output
  dist/
  build/
  
  # IDE
  .vscode/
  .idea/
  *.swp
  *.swo
  *~
  
  # OS
  .DS_Store
  Thumbs.db
  
  # Testing
  .jest/

`