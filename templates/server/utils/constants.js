const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
  };
  
  const TOKEN_TYPES = {
    ACCESS: 'access',
    REFRESH: 'refresh',
  };
  
  module.exports = {
    HTTP_STATUS,
    USER_ROLES,
    TOKEN_TYPES,
  };