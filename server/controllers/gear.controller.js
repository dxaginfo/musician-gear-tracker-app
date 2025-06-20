const Gear = require('../models/gear.model');
const Joi = require('joi');
const aws = require('aws-sdk');

// AWS S3 configuration
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Get all gear for current user
exports.getAllGear = async (req, res) => {
  try {
    const gear = await Gear.find({ user_id: req.user._id });
    res.json(gear);
  } catch (error) {
    console.error('Get all gear error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get specific gear item
exports.getGearById = async (req, res) => {
  try {
    const gear = await Gear.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });
    
    if (!gear) {
      return res.status(404).json({ message: 'Gear not found' });
    }
    
    res.json(gear);
  } catch (error) {
    console.error('Get gear by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new gear item
exports.createGear = async (req, res) => {
  try {
    // Validate request body
    const schema = Joi.object({
      name: Joi.string().required(),
      type: Joi.string().valid('guitar', 'bass', 'amp', 'pedal', 'keyboard', 'drums', 'microphone', 'accessory', 'other').required(),
      brand: Joi.string().allow(''),
      model: Joi.string().allow(''),
      serial_number: Joi.string().allow(''),
      year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
      purchase_info: Joi.object({
        date: Joi.date(),
        price: Joi.number().min(0),
        currency: Joi.string(),
        location: Joi.string().allow(''),
        receipt_image: Joi.string().allow('')
      }),
      specifications: Joi.object(),
      current_value: Joi.number().min(0),
      condition: Joi.string().valid('mint', 'excellent', 'good', 'fair', 'poor'),
      notes: Joi.string().allow(''),
      is_insured: Joi.boolean(),
      insurance_details: Joi.object({
        provider: Joi.string().allow(''),
        policy_number: Joi.string().allow(''),
        coverage_amount: Joi.number().min(0),
        expiry_date: Joi.date()
      })
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    // Create new gear item
    const gear = new Gear({
      ...req.body,
      user_id: req.user._id
    });
    
    await gear.save();
    
    res.status(201).json(gear);
  } catch (error) {
    console.error('Create gear error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update gear item
exports.updateGear = async (req, res) => {
  try {
    // Validate request body
    const schema = Joi.object({
      name: Joi.string(),
      type: Joi.string().valid('guitar', 'bass', 'amp', 'pedal', 'keyboard', 'drums', 'microphone', 'accessory', 'other'),
      brand: Joi.string().allow(''),
      model: Joi.string().allow(''),
      serial_number: Joi.string().allow(''),
      year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
      purchase_info: Joi.object({
        date: Joi.date(),
        price: Joi.number().min(0),
        currency: Joi.string(),
        location: Joi.string().allow(''),
        receipt_image: Joi.string().allow('')
      }),
      specifications: Joi.object(),
      current_value: Joi.number().min(0),
      condition: Joi.string().valid('mint', 'excellent', 'good', 'fair', 'poor'),
      notes: Joi.string().allow(''),
      is_insured: Joi.boolean(),
      insurance_details: Joi.object({
        provider: Joi.string().allow(''),
        policy_number: Joi.string().allow(''),
        coverage_amount: Joi.number().min(0),
        expiry_date: Joi.date()
      }),
      images: Joi.array().items(Joi.string())
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    // Find and update gear item
    const gear = await Gear.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!gear) {
      return res.status(404).json({ message: 'Gear not found' });
    }
    
    res.json(gear);
  } catch (error) {
    console.error('Update gear error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete gear item
exports.deleteGear = async (req, res) => {
  try {
    // Find and delete gear item
    const gear = await Gear.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id
    });
    
    if (!gear) {
      return res.status(404).json({ message: 'Gear not found' });
    }
    
    res.json({ message: 'Gear deleted successfully' });
  } catch (error) {
    console.error('Delete gear error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload images for gear
exports.uploadGearImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Find gear item
    const gear = await Gear.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });
    
    if (!gear) {
      return res.status(404).json({ message: 'Gear not found' });
    }
    
    // Upload files to S3
    const uploadPromises = req.files.map(file => {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `gear-images/${req.user._id}/${req.params.id}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
      };
      
      return s3.upload(params).promise();
    });
    
    const uploadResults = await Promise.all(uploadPromises);
    
    // Get image URLs
    const imageUrls = uploadResults.map(result => result.Location);
    
    // Update gear with new image URLs
    gear.images = gear.images ? [...gear.images, ...imageUrls] : imageUrls;
    await gear.save();
    
    res.json({
      message: 'Images uploaded successfully',
      images: imageUrls
    });
  } catch (error) {
    console.error('Upload images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
