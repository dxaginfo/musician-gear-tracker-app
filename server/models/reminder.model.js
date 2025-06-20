const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gear'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  due_date: {
    type: Date,
    required: true
  },
  is_recurring: {
    type: Boolean,
    default: false
  },
  recurrence_pattern: {
    type: Object,
    default: null
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  completed_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Indexes for faster queries
reminderSchema.index({ user_id: 1 });
reminderSchema.index({ gear_id: 1 });
reminderSchema.index({ due_date: 1 });
reminderSchema.index({ is_completed: 1 });

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
