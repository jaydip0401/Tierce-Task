# User Management & Authentication System

A full-stack web application for user management with role-based access control, built with Node.js, Express, React, and PostgreSQL.

## 🚀 Tech Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **Prisma ORM** - Database management and migrations
- **PostgreSQL** - Relational database
- **JWT** (jsonwebtoken) - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## 📋 Features

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Secure password hashing (bcrypt)
- ✅ Token-based authentication
- ✅ Protected routes

### Role-Based Access Control
- ✅ Admin role - Full system access
- ✅ User role - Limited to own profile
- ✅ Middleware-based authorization

### User Dashboard
- ✅ View own profile
- ✅ Update profile information
- ✅ Change password
- ✅ View account status and role
- ✅ Logout functionality

### Admin Panel
- ✅ View all users with pagination
- ✅ Search users by email or name
- ✅ Activate/Deactivate users
- ✅ User management table
- ✅ Real-time status updates

### Security Features
- ✅ Password hashing with bcrypt
- ✅ JWT token expiration
- ✅ Protected API routes
- ✅ Input validation and sanitization
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS protection (helmet, React escaping)
- ✅ Rate limiting
- ✅ CORS configuration

## 📁 Project Structure

```
node-dj-x/
├── backend/
│   ├── config/
│   │   └── database.js          # Prisma client configuration
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT authentication & authorization
│   │   └── errorHandler.middleware.js  # Centralized error handling
│   ├── routes/
│   │   ├── auth.routes.js        # Authentication routes
│   │   ├── user.routes.js        # User profile routes
│   │   └── admin.routes.js       # Admin management routes
│   ├── utils/
│   │   ├── jwt.utils.js          # JWT token utilities
│   │   └── validation.js         # Input validation rules
│   └── scripts/
│       └── seed.js               # Database seeding script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx         # Alert component
│   │   │   ├── Loading.jsx       # Loading spinner
│   │   │   └── PrivateRoute.jsx  # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Dashboard.jsx     # User dashboard
│   │   │   └── AdminPanel.jsx    # Admin panel
│   │   ├── utils/
│   │   │   └── api.js            # Axios API client
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── package.json
│   └── vite.config.js
├── prisma/
│   └── schema.prisma             # Database schema
├── server.js                     # Express server entry point
├── package.json                  # Backend dependencies
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose setup
└── README.md                     # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn

### Local Development Setup

#### 1. Clone the repository
```bash
git clone <repository-url>
cd node-dj-x
```

#### 2. Install Backend Dependencies
```bash
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/user_management_db?schema=public"

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Bcrypt Rounds
BCRYPT_ROUNDS=10
```

**Important:** Replace the database credentials and JWT_SECRET with your own values.

#### 5. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed database with test users
node backend/scripts/seed.js
```

#### 6. Start the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```


**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000


<img width="1889" height="939" alt="register_page" src="https://github.com/user-attachments/assets/8c562b60-fb72-4a2a-aec1-7be56931eb27" />
---

**Note:** This is a production-ready implementation focusing on security, scalability, and clean code architecture. All requirements from the task specification have been implemented, including bonus features like Docker setup and comprehensive documentation.

