const express = require('express');
const router = express.Router();
const { getAllReminders, createReminder, updateReminder, deleteReminder, completeReminder } = require('../controllers/reminder.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all reminders for current user
router.get('/', getAllReminders);

// Create new reminder
router.post('/', createReminder);

// Update reminder
router.put('/:id', updateReminder);

// Delete reminder
router.delete('/:id', deleteReminder);

// Mark reminder as completed
router.put('/:id/complete', completeReminder);

module.exports = router;
