const express = require('express');
const router = express.Router();
const { getAllGear, getGearById, createGear, updateGear, deleteGear, uploadGearImages } = require('../controllers/gear.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all gear for current user
router.get('/', getAllGear);

// Get specific gear item
router.get('/:id', getGearById);

// Create new gear item
router.post('/', createGear);

// Update gear item
router.put('/:id', updateGear);

// Delete gear item
router.delete('/:id', deleteGear);

// Upload images for gear
router.post('/:id/images', upload.array('images', 5), uploadGearImages);

module.exports = router;
