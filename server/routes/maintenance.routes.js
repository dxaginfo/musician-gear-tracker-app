const express = require('express');
const router = express.Router();
const { getMaintenanceByGearId, createMaintenance, updateMaintenance, deleteMaintenance } = require('../controllers/maintenance.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get maintenance records for specific gear
router.get('/:gearId', getMaintenanceByGearId);

// Create new maintenance record
router.post('/', createMaintenance);

// Update maintenance record
router.put('/:id', updateMaintenance);

// Delete maintenance record
router.delete('/:id', deleteMaintenance);

module.exports = router;
