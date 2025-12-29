require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminEmail = 'admin@example.com';
  const adminPassword = 'Admin123!';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.create({
      data: {
        fullName: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true
      }
    });
    console.log('Admin user created:', admin.email);
    console.log('Admin password:', adminPassword);
  }

  // Create test user
  const userEmail = 'user@example.com';
  const userPassword = 'User123!';

  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail }
  });

  if (existingUser) {
    console.log('Test user already exists');
  } else {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user = await prisma.user.create({
      data: {
        fullName: 'Test User',
        email: userEmail,
        password: hashedPassword,
        role: 'USER',
        isActive: true
      }
    });
    console.log('Test user created:', user.email);
    console.log('Test user password:', userPassword);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

