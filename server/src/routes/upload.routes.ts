import express from 'express';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { uploadFile, getUploads } from '../controllers/upload.controller';

// Define interface for multer file type
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

const router = express.Router();

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: Request, file: MulterFile, cb: FileFilterCallback) => {
    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload file for a specific subcontractor
router.post('/:subcontractorId/upload', upload.single('certificate'), uploadFile);

// Get all uploads for a specific subcontractor
router.get('/:subcontractorId/uploads', getUploads);

export default router; 