# MERN Stack Server

Backend server for MERN stack application with authentication, user management, and more.

## Features

- ✅ User Authentication (Register, Login, Logout)
- ✅ JWT Token-based Authentication
- ✅ Refresh Token Implementation
- ✅ Role-based Access Control (User, Admin)
- ✅ MongoDB Integration with Mongoose
- ✅ Input Validation with Joi
- ✅ Error Handling Middleware
- ✅ Rate Limiting
- ✅ Security Headers with Helmet
- ✅ CORS Configuration
- ✅ Logging with Winston
- ✅ Environment Configuration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Joi** - Validation
- **Winston** - Logging
- **Bcrypt** - Password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-app
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
CLIENT_URL=http://localhost:3000
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check server health

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/profile` - Update own profile (Protected)

## Project Structure
```
server/
├── config/           # Configuration files
├── models/           # Database models
├── routes/           # API routes
├── controllers/      # Route controllers
├── services/         # Business logic
├── middlewares/      # Custom middlewares
├── validators/       # Input validation schemas
├── utils/            # Utility functions
├── tests/            # Test files
├── logs/             # Log files (auto-generated)
├── server.js         # Entry point
├── .env              # Environment variables
└── package.json      # Dependencies
```

## Testing

Run tests:
```bash
npm test
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- Security headers with Helmet
- CORS configuration

## Error Handling

All errors are handled by a centralized error middleware that returns consistent error responses:
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## Logging

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/mern-app |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| JWT_REFRESH_SECRET | Refresh token secret | - |
| JWT_REFRESH_EXPIRE | Refresh token expiration | 30d |
| CLIENT_URL | Frontend URL | http://localhost:3000 |

## Contributing

1. Fork the repository: [https://github.com/HerambInamke/mung-dal](https://github.com/HerambInamke/mung-dal)
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
```

## Create Empty Directories for Tests and Logs

**`templates/server/tests/unit/.gitkeep`**:
```
# This file keeps the directory in git
```

**`templates/server/tests/integration/.gitkeep`**:
```
# This file keeps the directory in git
```

**`templates/server/logs/.gitkeep`**:
```
# This file keeps the directory in git