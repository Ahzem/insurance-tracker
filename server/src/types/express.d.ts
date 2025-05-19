import { Express } from 'express-serve-static-core';

// Extend Express Request to include the file property added by multer
declare global {
  namespace Express {
    interface Request {
      file?: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination?: string;
        filename?: string;
        path?: string;
        buffer: Buffer;
      };
    }
  }
} 