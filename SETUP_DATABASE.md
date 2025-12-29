# Database Setup Instructions

## You need to configure PostgreSQL before running the project

### Step 1: Install PostgreSQL (if not installed)

**Windows:**
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Default port is `5432`

**Or use Chocolatey:**
```powershell
choco install postgresql
```

### Step 2: Create the Database

Open **pgAdmin** (comes with PostgreSQL) or **psql** command line and run:

```sql
CREATE DATABASE user_management_db;
```

**Or using psql command line:**
```bash
psql -U postgres
CREATE DATABASE user_management_db;
\q
```

### Step 3: Update .env File

Open the `.env` file in the project root and update the `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/user_management_db?schema=public"
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

**Common configurations:**
- Username: `postgres` (default)
- Password: (the one you set during installation)
- Host: `localhost`
- Port: `5432`
- Database: `user_management_db`

### Step 4: Test Connection

After updating `.env`, run:
```bash
npx prisma migrate dev --name init
```

If successful, you'll see the database tables created!

### Alternative: Use Docker (if you install Docker Desktop)

1. Install Docker Desktop from: https://www.docker.com/products/docker-desktop
2. Then run:
   ```bash
   docker-compose up -d postgres
   ```
3. Use this DATABASE_URL in .env:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_management_db?schema=public"
   ```

