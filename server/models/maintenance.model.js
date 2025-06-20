const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  gear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gear',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['repair', 'setup', 'string_change', 'modification', 'cleaning', 'part_replacement', 'other']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  service_provider: String,
  cost: Number,
  description: String,
  parts_replaced: [String],
  images: [String]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Indexes for faster queries
maintenanceSchema.index({ gear_id: 1 });
maintenanceSchema.index({ date: -1 });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
