const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['guitar', 'bass', 'amp', 'pedal', 'keyboard', 'drums', 'microphone', 'accessory', 'other']
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  serial_number: {
    type: String,
    trim: true
  },
  year: {
    type: Number
  },
  purchase_info: {
    date: Date,
    price: Number,
    currency: String,
    location: String,
    receipt_image: String
  },
  specifications: {
    type: Object,
    default: {}
  },
  current_value: {
    type: Number
  },
  condition: {
    type: String,
    enum: ['mint', 'excellent', 'good', 'fair', 'poor']
  },
  images: [String],
  notes: String,
  is_insured: {
    type: Boolean,
    default: false
  },
  insurance_details: {
    provider: String,
    policy_number: String,
    coverage_amount: Number,
    expiry_date: Date
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Index for faster user-based queries
gearSchema.index({ user_id: 1 });

const Gear = mongoose.model('Gear', gearSchema);

module.exports = Gear;
