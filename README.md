# mung-dal

# Mung Dal - MERN Stack Boilerplate Generator

🚀 Quickly scaffold a production-ready MERN stack backend with authentication, user management, and best practices built-in.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/HerambInamke/mung-dal)

## Features

- ✅ Complete Express.js backend structure
- ✅ MongoDB integration with Mongoose
- ✅ JWT authentication with refresh tokens
- ✅ Role-based access control
- ✅ Input validation with Joi
- ✅ Error handling middleware
- ✅ Rate limiting
- ✅ Security best practices
- ✅ Logging with Winston
- ✅ Well-organized folder structure

## Quick Start
```bash
# Using npx (recommended)
npx mung-dal my-project

# Or install globally
npm install -g mung-dal
mung-dal my-project
```

This will create a `my-project` directory with a complete backend setup.

## What's Included
```
my-project/
└── server/
    ├── config/          # Database and environment config
    ├── models/          # Mongoose models (User, Session)
    ├── routes/          # API routes
    ├── controllers/     # Route handlers
    ├── services/        # Business logic
    ├── middlewares/     # Custom middlewares
    ├── validators/      # Joi validation schemas
    ├── utils/           # Utility functions
    ├── tests/           # Test structure
    ├── server.js        # Entry point
    └── .env.example     # Environment template
```

## After Installation

1. Navigate to your project:
```bash
cd my-project/server
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
```

3. Start the development server:
```bash
npm run dev
```

Your server will be running on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get profile (protected)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/profile` - Update own profile (protected)

### Health
- `GET /api/health` - Health check

## Requirements

- Node.js 14+
- MongoDB (local or Atlas)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository: [https://github.com/HerambInamke/mung-dal](https://github.com/HerambInamke/mung-dal)
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Repository

GitHub: [https://github.com/HerambInamke/mung-dal](https://github.com/HerambInamke/mung-dal)