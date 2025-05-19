import { Request, Response } from 'express';
import DashboardService from '../services/dashboard.service';

export default class DashboardController {
  /**
   * Get dashboard data
   * @route GET /api/dashboard
   */
  public static getDashboardData(req: Request, res: Response): void {
    try {
      const dashboardData = DashboardService.getDashboardData();
      res.status(200).json(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
  }
} 