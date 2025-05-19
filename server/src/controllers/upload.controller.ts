import { Request, Response } from 'express';
import { uploadSubcontractorFile, getSubcontractorUploads } from '../services/upload.service';

/**
 * Handle file upload for a subcontractor
 * Creates a dummy record in the database but doesn't actually store the file
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { subcontractorId } = req.params;
    const description = req.body.description || '';
    
    // For simplicity, assume userId is coming from auth middleware
    // In a real app, this would be extracted from a JWT token or session
    const userId = req.body.userId || '000000000000000000000000'; // Placeholder userId

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // This will create a dummy record in the database
    const upload = await uploadSubcontractorFile(
      req.file,
      subcontractorId,
      userId,
      description
    );

    return res.status(201).json({
      success: true,
      data: upload,
      message: 'File processed and dummy record created in database. The actual file was not stored.'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

/**
 * Get all uploads for a subcontractor
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUploads = async (req: Request, res: Response) => {
  try {
    const { subcontractorId } = req.params;
    const uploads = await getSubcontractorUploads(subcontractorId);

    return res.status(200).json({
      success: true,
      data: uploads
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
}; 