const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getCurrentUser } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Forgot password request
router.post('/forgot-password', forgotPassword);

// Reset password with token
router.post('/reset-password', resetPassword);

// Get current user (protected route)
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
