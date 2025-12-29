require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test passed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error:', error.message);
    console.log('\nPlease check:');
    console.log('1. PostgreSQL is running');
    console.log('2. Database "user_management_db" exists');
    console.log('3. DATABASE_URL in .env file is correct');
    console.log('4. Username and password are correct');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

