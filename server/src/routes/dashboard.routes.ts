import { Router } from 'express';
import DashboardController from '../controllers/dashboard.controller';

const router = Router();

// GET /api/dashboard
router.get('/', DashboardController.getDashboardData);

export default router; 