const express = require('express');
const prisma = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

// Get all users with pagination and search
router.get('/users', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || '';
    const skip = (page - 1) * limit;

    // Build search condition
    const searchCondition = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { fullName: { contains: search, mode: 'insensitive' } }
          ],
          deletedAt: null // Only show non-deleted users
        }
      : { deletedAt: null };

    // Get users with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: searchCondition,
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.user.count({
        where: searchCondition
      })
    ]);

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single user by ID
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
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

    if (!user || user.deletedAt) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Toggle user active status
router.patch('/users/:id/toggle-status', async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deactivating themselves
    if (userId === req.user.id) {
      return res.status(400).json({
        error: 'Invalid operation',
        message: 'You cannot deactivate your own account'
      });
    }

    // Get current user status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true, deletedAt: true }
    });

    if (!user || user.deletedAt) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Toggle status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
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
      message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`,
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

// Soft delete user
router.delete('/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({
        error: 'Invalid operation',
        message: 'You cannot delete your own account'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { deletedAt: true }
    });

    if (!user || user.deletedAt) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Soft delete
    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

