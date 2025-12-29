const express = require('express');
const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const { authenticate } = require('../middleware/auth.middleware');
const { updateProfileValidation } = require('../utils/validation');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get own profile
router.get('/profile', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Update own profile
router.put('/profile', updateProfileValidation, async (req, res, next) => {
  try {
    const { fullName, password } = req.body;
    const updateData = {};

    if (fullName) {
      updateData.fullName = fullName;
    }

    if (password) {
      // Validate password if provided
      if (password.length < 8) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Password must be at least 8 characters'
        });
      }
      updateData.password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS || 10));
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'No valid fields to update'
      });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

