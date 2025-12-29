# User Management & Authentication System - Project Documentation

## 📋 Project Overview

A full-stack web application for user management with role-based access control, featuring secure authentication, user profiles, and an admin panel for user management.

**Project Type:** Full-Stack Web Application  
**Development Status:** Production Ready  
**Version:** 1.0.0

---

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18.2
- **Database:** SQLite (Development) / PostgreSQL (Production)
- **ORM:** Prisma 5.7.1
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Security:** helmet, express-rate-limit

### Frontend
- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Routing:** React Router DOM 6.20.1
- **HTTP Client:** Axios 1.6.2
- **Styling:** Tailwind CSS 3.3.6
- **Icons:** SVG (Built-in)

---

## ✨ Features

### Authentication System
- ✅ User Registration with validation
- ✅ User Login (Regular users only)
- ✅ Admin Login (Separate route)
- ✅ JWT-based authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Token expiration handling
- ✅ Protected routes

### User Dashboard
- ✅ View profile information
- ✅ Edit profile (name, password)
- ✅ View account status
- ✅ View role and membership details
- ✅ Responsive design

### Admin Panel
- ✅ View all users
- ✅ Search users by email/name
- ✅ Pagination support
- ✅ Activate/Deactivate users
- ✅ User management table
- ✅ Real-time status updates

### Security Features
- ✅ Password hashing (bcrypt)
- ✅ JWT token expiration
- ✅ Protected API routes
- ✅ Input validation
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ Rate limiting
- ✅ CORS configuration

---

## 🔐 Login Credentials

### Test Accounts

#### Admin Account
```
Email: admin@example.com
Password: Admin123!
Login URL: http://localhost:5173/login/admin
```

#### Regular User Account
```
Email: user@example.com
Password: User123!
Login URL: http://localhost:5173/login
```

### Important Notes
- **Admins CANNOT login at `/login`** - They must use `/login/admin`
- **Regular users CANNOT login at `/login/admin`** - They must use `/login`
- Both accounts are created automatically when you run the seed script

---

## 📁 Project Structure

```
node-dj-x/
├── backend/
│   ├── config/
│   │   └── database.js          # Prisma client configuration
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT authentication & authorization
│   │   └── errorHandler.middleware.js  # Centralized error handling
│   ├── routes/
│   │   ├── auth.routes.js       # Authentication routes
│   │   ├── user.routes.js       # User profile routes
│   │   └── admin.routes.js      # Admin management routes
│   ├── utils/
│   │   ├── jwt.utils.js         # JWT token utilities
│   │   └── validation.js        # Input validation rules
│   └── scripts/
│       └── seed.js              # Database seeding script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx        # Alert component
│   │   │   ├── Loading.jsx      # Loading spinner
│   │   │   ├── Layout.jsx        # Main layout with navbar
│   │   │   └── PrivateRoute.jsx  # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Regular user login
│   │   │   ├── AdminLogin.jsx    # Admin login
│   │   │   ├── Register.jsx     # User registration
│   │   │   ├── Dashboard.jsx    # User dashboard
│   │   │   └── AdminPanel.jsx   # Admin panel
│   │   ├── utils/
│   │   │   └── api.js           # Axios API client
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── package.json
│   └── vite.config.js
├── prisma/
│   └── schema.prisma             # Database schema
├── server.js                     # Express server entry point
├── package.json                  # Backend dependencies
├── docker-compose.yml            # Docker Compose setup
├── Dockerfile                    # Docker configuration
└── README.md                     # Project README
```

---

## 🔄 Application Flow

### Authentication Flow

```
┌─────────────────┐
│   User Visits   │
│   Application   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Check if User   │
│   is Logged In   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
   Yes       No
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────┐
│Redirect │ │ Show Login   │
│to       │ │ Page         │
│Dashboard│ └──────┬───────┘
└─────────┘        │
                   ▼
         ┌─────────────────┐
         │ User Enters      │
         │ Credentials      │
         └────────┬─────────┘
                  │
         ┌────────┴────────┐
         │                 │
    Regular User      Admin User
         │                 │
         ▼                 ▼
┌──────────────┐   ┌──────────────┐
│ /login       │   │ /login/admin │
│ (Blocks      │   │ (Blocks      │
│  Admins)     │   │  Regular)    │
└──────┬───────┘   └──────┬───────┘
       │                  │
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ Validate     │   │ Validate     │
│ Credentials  │   │ Credentials  │
└──────┬───────┘   └──────┬───────┘
       │                  │
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ Generate JWT│   │ Generate JWT │
│ Token        │   │ Token        │
└──────┬───────┘   └──────┬───────┘
       │                  │
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ Redirect to  │   │ Redirect to  │
│ Dashboard    │   │ Admin Panel  │
└──────────────┘   └──────────────┘
```

### User Dashboard Flow

```
┌─────────────────┐
│   User Login    │
│   Successful    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Dashboard Page │
│  (Protected)    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
View Mode  Edit Mode
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────┐
│ Display │ │ Show Edit     │
│ Profile │ │ Form          │
│ Info    │ └──────┬───────┘
└─────────┘        │
                   ▼
         ┌─────────────────┐
         │ User Updates     │
         │ Information      │
         └────────┬─────────┘
                  │
                  ▼
         ┌─────────────────┐
         │ Validate & Save  │
         │ to Database      │
         └────────┬─────────┘
                  │
                  ▼
         ┌─────────────────┐
         │ Show Success     │
         │ Message           │
         └───────────────────┘
```

### Admin Panel Flow

```
┌─────────────────┐
│  Admin Login    │
│  Successful     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Admin Panel    │
│  (Protected)    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
View Users  Search
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────┐
│ Fetch   │ │ Filter Users │
│ All     │ │ by Query     │
│ Users   │ └──────────────┘
└────┬────┘
     │
     ▼
┌─────────────────┐
│ Display Users   │
│ in Table        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
Toggle    Pagination
Status
    │
    ▼
┌─────────────────┐
│ Update User     │
│ Status in DB    │
└─────────────────┘
```

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

### Step 1: Install Dependencies

#### Backend Dependencies
```bash
# Navigate to project root
cd node-dj-x

# Install backend dependencies
npm install
```

#### Frontend Dependencies
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Return to project root
cd ..
```

### Step 2: Environment Configuration

1. **Create `.env` file** in the project root:
```bash
# Copy the example file
cp env.example .env
```

2. **Update `.env` file** with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Database (SQLite for quick setup)
DATABASE_URL="file:./dev.db"

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Bcrypt Rounds
BCRYPT_ROUNDS=10
```

**Note:** For production, use PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/user_management_db?schema=public"
```

### Step 3: Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with test users (optional)
npm run seed
```

### Step 4: Verify Setup

```bash
# Test database connection
npm run test-db
```

---

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Backend Server
```bash
# From project root directory
npm run dev
```

**Backend will run on:** `http://localhost:5000`

#### Terminal 2 - Frontend Server
```bash
# From project root directory
cd frontend
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

### Production Mode

#### Backend
```bash
# From project root directory
npm start
```

#### Frontend
```bash
# Build the frontend
cd frontend
npm run build

# Preview the build (optional)
npm run preview
```

---

## 📡 API Endpoints

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
  "role": "USER"
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "User123!"
}
```

#### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin123!"
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
  "password": "NewPassword123"
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

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  fullName  String
  email     String   @unique
  password  String
  role      String   @default("USER") // ADMIN or USER
  isActive  Boolean  @default(true)
  deletedAt String?  // Soft delete
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([role])
  @@map("users")
}
```

---

## 🔒 Security Features

1. **Password Security**
   - Bcrypt hashing with 10 rounds
   - Minimum 8 characters
   - Requires uppercase, lowercase, and number

2. **JWT Authentication**
   - Token expiration: 24 hours
   - Secure token storage
   - Automatic token refresh on login

3. **Route Protection**
   - Middleware-based authentication
   - Role-based authorization
   - Protected API endpoints

4. **Input Validation**
   - Email format validation
   - Password strength requirements
   - Input sanitization

5. **Rate Limiting**
   - 100 requests per 15 minutes per IP
   - Prevents brute force attacks

---

## 📱 Application URLs

### Frontend Routes
- **Home/Redirect:** `http://localhost:5173/`
- **User Login:** `http://localhost:5173/login`
- **Admin Login:** `http://localhost:5173/login/admin`
- **Register:** `http://localhost:5173/register`
- **User Dashboard:** `http://localhost:5173/dashboard`
- **Admin Panel:** `http://localhost:5173/admin`

### Backend API
- **Base URL:** `http://localhost:5000/api`
- **Health Check:** `http://localhost:5000/api/health`

---

## 🐳 Docker Setup (Optional)

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build image
docker build -t user-management-backend .

# Run container
docker run -p 5000:5000 user-management-backend
```

---

## 📝 Available Scripts

### Backend Scripts
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run seed         # Seed database with test users
npm run test-db      # Test database connection
npx prisma generate  # Generate Prisma Client
npx prisma migrate   # Run database migrations
npx prisma studio    # Open Prisma Studio (database GUI)
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🧪 Testing the Application

### 1. Test User Login
1. Navigate to `http://localhost:5173/login`
2. Enter email: `user@example.com`
3. Enter password: `User123!`
4. Click "Sign In"
5. Should redirect to Dashboard

### 2. Test Admin Login
1. Navigate to `http://localhost:5173/login/admin`
2. Enter email: `admin@example.com`
3. Enter password: `Admin123!`
4. Click "Admin Sign In"
5. Should redirect to Admin Panel

### 3. Test Admin Access Restriction
1. Try to login as admin at `/login`
2. Should show error and redirect to `/login/admin`

### 4. Test User Access Restriction
1. Try to login as user at `/login/admin`
2. Should show error and redirect to `/login`

---

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Check database connection
npm run test-db
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001  # or any available port

# For frontend, edit vite.config.js
server: {
  port: 5174  # or any available port
}
```

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables in hosting platform
2. Ensure database is provisioned
3. Run migrations: `npx prisma migrate deploy`
4. Start server: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure API proxy or update API base URL in `vite.config.js`

---

## 📄 License

This project is created for evaluation purposes.

---

## 👤 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the README.md file
3. Check API documentation in README.md

---

## 📊 Project Statistics

- **Total Files:** 30+
- **Lines of Code:** ~3000+
- **Components:** 8 React components
- **API Routes:** 10+ endpoints
- **Database Models:** 1 (User)
- **Dependencies:** 20+ packages

---

**Documentation Version:** 1.0.0  
**Last Updated:** December 2024  
**Project Status:** Production Ready ✅

