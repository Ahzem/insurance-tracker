import { Request, Response } from 'express';
import subcontractorService from '../services/subcontractor.service';

export class SubcontractorController {
  /**
   * Create a new subcontractor
   */
  async createSubcontractor(req: Request, res: Response): Promise<Response> {
    try {
      const subcontractor = await subcontractorService.createSubcontractor(req.body);
      return res.status(201).json({
        success: true,
        data: subcontractor
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: error.message || 'Failed to create subcontractor'
      });
    }
  }

  /**
   * Get all subcontractors
   */
  async getAllSubcontractors(req: Request, res: Response): Promise<Response> {
    try {
      const subcontractors = await subcontractorService.getAllSubcontractors();
      return res.status(200).json({
        success: true,
        count: subcontractors.length,
        data: subcontractors
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to retrieve subcontractors'
      });
    }
  }

  /**
   * Get subcontractor by ID
   */
  async getSubcontractorById(req: Request, res: Response): Promise<Response> {
    try {
      const subcontractor = await subcontractorService.getSubcontractorById(req.params.id);
      
      if (!subcontractor) {
        return res.status(404).json({
          success: false,
          error: 'Subcontractor not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: subcontractor
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to retrieve subcontractor'
      });
    }
  }

  /**
   * Update subcontractor
   */
  async updateSubcontractor(req: Request, res: Response): Promise<Response> {
    try {
      const subcontractor = await subcontractorService.updateSubcontractor(req.params.id, req.body);
      
      if (!subcontractor) {
        return res.status(404).json({
          success: false,
          error: 'Subcontractor not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: subcontractor
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: error.message || 'Failed to update subcontractor'
      });
    }
  }

  /**
   * Delete subcontractor
   */
  async deleteSubcontractor(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await subcontractorService.deleteSubcontractor(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Subcontractor not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to delete subcontractor'
      });
    }
  }
}

export default new SubcontractorController(); 