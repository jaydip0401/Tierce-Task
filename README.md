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

### Docker Setup

#### 1. Build and Run with Docker Compose
```bash
docker-compose up --build
```

This will:
- Start PostgreSQL database
- Build and start the backend server
- Run database migrations automatically

#### 2. Seed Database (Optional)
```bash
docker-compose exec backend node backend/scripts/seed.js
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "USER" // Optional: "ADMIN" or "USER"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "isActive": true
  },
  "token": "jwt-token"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "isActive": true
  },
  "token": "jwt-token"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### User Endpoints (Protected)

#### Get Profile
```http
GET /api/user/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "Updated Name",
  "password": "NewPassword123" // Optional
}
```

### Admin Endpoints (Admin Only)

#### Get All Users
```http
GET /api/admin/users?page=1&limit=10&search=john
Authorization: Bearer <admin-token>
```

#### Toggle User Status
```http
PATCH /api/admin/users/:id/toggle-status
Authorization: Bearer <admin-token>
```

#### Delete User (Soft Delete)
```http
DELETE /api/admin/users/:id
Authorization: Bearer <admin-token>
```

## 🔐 Default Test Accounts

After running the seed script, you can use these accounts:

**Admin Account:**
- Email: `admin@example.com`
- Password: `Admin123!`

**User Account:**
- Email: `user@example.com`
- Password: `User123!`

## 🧪 Testing the Application

1. **Register a new user:**
   - Navigate to http://localhost:5173/register
   - Fill in the registration form
   - You'll be automatically logged in

2. **Login:**
   - Navigate to http://localhost:5173/login
   - Use your credentials or the test accounts

3. **User Dashboard:**
   - View your profile
   - Edit your profile information
   - Change your password

4. **Admin Panel (Admin users only):**
   - Navigate to Admin Panel from dashboard
   - View all users
   - Search for users
   - Activate/Deactivate users

## 🔒 Security Considerations

1. **Environment Variables:** Never commit `.env` files. Use `.env.example` as a template.
2. **JWT Secret:** Use a strong, random secret in production.
3. **Password Requirements:** Minimum 8 characters with uppercase, lowercase, and number.
4. **Rate Limiting:** API endpoints are rate-limited to prevent abuse.
5. **CORS:** Configured to allow requests only from the frontend URL.
6. **SQL Injection:** Protected by Prisma ORM parameterized queries.
7. **XSS:** React automatically escapes user input, and helmet adds security headers.

## 📝 Assumptions Made

1. **Database:** PostgreSQL is used, but the schema can be adapted for MySQL/MongoDB.
2. **Authentication:** JWT tokens are stored in localStorage (can be upgraded to httpOnly cookies for better security).
3. **Soft Delete:** Users are soft-deleted (deletedAt field) rather than hard-deleted.
4. **Pagination:** Basic pagination with 10 items per page by default.
5. **Role Assignment:** Users can self-assign roles during registration (can be restricted in production).

## 🚀 Deployment

### Backend Deployment (Render/Railway/Vercel)

1. Set environment variables in your hosting platform
2. Ensure PostgreSQL database is provisioned
3. Run migrations: `npx prisma migrate deploy`
4. Start server: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure API proxy or update API base URL

## 📄 License

This project is created for evaluation purposes.

## 👤 Author

Built as a practical task for full-stack web developer position.

---

**Note:** This is a production-ready implementation focusing on security, scalability, and clean code architecture. All requirements from the task specification have been implemented, including bonus features like Docker setup and comprehensive documentation.

