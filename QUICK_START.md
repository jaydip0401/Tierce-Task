# Quick Start Guide

## ⚠️ Database Setup Required

Before running the project, you need to set up PostgreSQL:

### Option 1: Local PostgreSQL Installation

1. **Install PostgreSQL** (if not already installed):
   - Download from: https://www.postgresql.org/download/windows/
   - Or use: `choco install postgresql` (if you have Chocolatey)

2. **Create Database**:
   ```sql
   -- Open PostgreSQL command line (psql) or pgAdmin
   CREATE DATABASE user_management_db;
   ```

3. **Update .env file** with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/user_management_db?schema=public"
   ```
   
   Common defaults:
   - Username: `postgres`
   - Password: (the one you set during installation)
   - Port: `5432`

### Option 2: Docker (Easiest - Recommended)

If you have Docker installed, you can use Docker Compose:

```bash
# This will start PostgreSQL automatically
docker-compose up -d postgres

# Then update .env with:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_management_db?schema=public"
```

## 🚀 After Database Setup

Once your database is configured:

1. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

2. **Seed database (optional - creates test users):**
   ```bash
   npm run seed
   ```

3. **Start Backend:**
   ```bash
   npm run dev
   ```

4. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📝 Test Accounts (after seeding)

- **Admin:** admin@example.com / Admin123!
- **User:** user@example.com / User123!

