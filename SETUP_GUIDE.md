# Complete Setup Guide - User Management System

## 🎯 Prerequisites

Before starting, ensure you have:
- ✅ Node.js (v18 or higher) installed
- ✅ npm (comes with Node.js)
- ✅ Code editor (VS Code recommended)
- ✅ Terminal/Command Prompt access

---

## 📥 Step-by-Step Installation

### Step 1: Navigate to Project Directory

```bash
cd node-dj-x
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

**Expected Output:**
```
added 127 packages, and audited 128 packages
```

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

**Expected Output:**
```
added 200 packages, and audited 201 packages
```

### Step 4: Create Environment File

```bash
# Windows (PowerShell)
Copy-Item env.example .env

# Mac/Linux
cp env.example .env
```

### Step 5: Configure Environment Variables

Open `.env` file and verify these settings:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=10
```

**Note:** The database is set to SQLite (`file:./dev.db`) for easy setup. For production, use PostgreSQL.

### Step 6: Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with test users
npm run seed
```

**Expected Output:**
```
✔ Generated Prisma Client
✔ Applied migration
Admin user created: admin@example.com
Test user created: user@example.com
```

### Step 7: Verify Database Connection

```bash
npm run test-db
```

**Expected Output:**
```
✅ Database connection successful!
✅ Database query test passed!
```

---

## 🚀 Running the Application

### Option 1: Development Mode (Recommended)

**Terminal 1 - Start Backend:**
```bash
npm run dev
```

**Expected Output:**
```
Server running on port 5000
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Option 2: Production Mode

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## ✅ Verification Steps

### 1. Check Backend is Running
Open browser: http://localhost:5000/api/health

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Check Frontend is Running
Open browser: http://localhost:5173

**Expected:** Login page should appear

### 3. Test User Login
1. Go to: http://localhost:5173/login
2. Email: `user@example.com`
3. Password: `User123!`
4. Click "Sign In"
5. Should redirect to Dashboard

### 4. Test Admin Login
1. Go to: http://localhost:5173/login/admin
2. Email: `admin@example.com`
3. Password: `Admin123!`
4. Click "Admin Sign In"
5. Should redirect to Admin Panel

---

## 🔧 Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Change PORT in .env file
PORT=5001
```

### Issue 2: Database Connection Failed

**Error:**
```
Error: P1000: Authentication failed
```

**Solution:**
```bash
# For SQLite, ensure DATABASE_URL is:
DATABASE_URL="file:./dev.db"

# Regenerate Prisma Client
npx prisma generate
```

### Issue 3: Module Not Found

**Error:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Frontend Build Errors

**Error:**
```
Failed to resolve import
```

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Project Status Check

Run these commands to verify everything is set up correctly:

```bash
# Check Node.js version
node --version
# Should be v18 or higher

# Check npm version
npm --version

# Check if dependencies are installed
ls node_modules
# Should show many folders

# Check if database exists
ls dev.db
# Should show dev.db file

# Test database connection
npm run test-db
# Should show success message
```

---

## 🎨 Access Points

Once running, access the application at:

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:5173 | ✅ |
| Backend API | http://localhost:5000/api | ✅ |
| Health Check | http://localhost:5000/api/health | ✅ |
| User Login | http://localhost:5173/login | ✅ |
| Admin Login | http://localhost:5173/login/admin | ✅ |

---

## 📝 Next Steps

After successful setup:

1. ✅ Test all login flows
2. ✅ Explore the dashboard
3. ✅ Test admin panel features
4. ✅ Review API endpoints
5. ✅ Customize as needed

---

## 🆘 Need Help?

1. Check **PROJECT_DOCUMENTATION.md** for detailed docs
2. Check **CLIENT_DELIVERY.md** for quick reference
3. Review error messages carefully
4. Verify all prerequisites are installed

---

**Setup Guide Version:** 1.0.0  
**Last Updated:** December 2024

