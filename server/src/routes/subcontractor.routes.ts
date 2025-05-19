import { Router } from 'express';
import subcontractorController from '../controllers/subcontractor.controller';

const router = Router();

// Create a new subcontractor
router.post('/', subcontractorController.createSubcontractor);

// Get all subcontractors
router.get('/', subcontractorController.getAllSubcontractors);

// Get subcontractor by ID
router.get('/:id', subcontractorController.getSubcontractorById);

// Update subcontractor
router.put('/:id', subcontractorController.updateSubcontractor);

// Delete subcontractor
router.delete('/:id', subcontractorController.deleteSubcontractor);

export default router; 