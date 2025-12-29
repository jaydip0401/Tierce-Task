const express = require('express');
const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const { generateToken } = require('../utils/jwt.utils');
const { registerValidation, loginValidation } = require('../utils/validation');

const router = express.Router();

// Register
router.post('/register', registerValidation, async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'An account with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS || 10));

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: role || 'USER'
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.deletedAt) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account deactivated',
        message: 'Your account has been deactivated. Please contact an administrator.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      },
      token
    });
  } catch (error) {
    next(error);
  }
});

// Logout (client-side token removal, but we can add token blacklisting here if needed)
router.post('/logout', (req, res) => {
  // In a production app, you might want to implement token blacklisting
  // For now, logout is handled client-side by removing the token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;

