import Upload, { IUpload } from '../models/upload.model';
import Subcontractor from '../models/subcontractor.model';
import { uploadToS3InsuranceCertificates } from '../utils/s3.utils';
import mongoose, { Types } from 'mongoose';

/**
 * Create a new upload record in the database
 * 
 * @param uploadData - Data for the new upload
 * @returns The created upload document
 */
export const createUpload = async (uploadData: any): Promise<IUpload> => {
  const upload = new Upload(uploadData);
  return await upload.save();
};

/**
 * Process a file upload for a subcontractor and store a dummy record
 * 
 * @param file - The file to upload
 * @param subcontractorId - The ID of the subcontractor to associate the file with
 * @param userId - The ID of the user uploading the file
 * @param description - Optional description of the file
 * @returns Information about the processed file and created database record
 */
export const uploadSubcontractorFile = async (
  file: any,
  subcontractorId: string,
  userId: string,
  description: string = ''
): Promise<IUpload> => {
  // Check if subcontractor exists
  const subcontractor = await Subcontractor.findById(subcontractorId);
  if (!subcontractor) {
    throw new Error('Subcontractor not found');
  }

  // Process the file and upload it to S3
  const fileInfo = await uploadToS3InsuranceCertificates(file, userId);
  
  // Log file processing
  console.log(`[PROCESSED FILE] Certificate for subcontractor ${subcontractorId}`);
  console.log(`Original filename: ${fileInfo.originalName}`);
  console.log(`File size: ${fileInfo.size} bytes`);
  console.log(`MIME type: ${fileInfo.mimeType}`);
  console.log(`File URL: ${fileInfo.url}`);
  
  // Create upload record in the database with S3 URL
  const uploadRecord = await createUpload({
    originalName: fileInfo.originalName,
    storedName: fileInfo.storedName,
    url: fileInfo.url, // Use S3 URL from the upload response
    mimeType: fileInfo.mimeType,
    size: fileInfo.size,
    uploadDate: new Date(),
    uploadedBy: new mongoose.Types.ObjectId(userId),
    description: description || `Certificate for ${subcontractor.businessName}`,
    isDeleted: false
  });
  
  // Associate the upload record with the subcontractor
  if (subcontractor.uploads && Array.isArray(subcontractor.uploads)) {
    subcontractor.uploads.push(uploadRecord._id as unknown as Types.ObjectId);
    await subcontractor.save();
    console.log(`[DATABASE] Associated upload ${uploadRecord._id} with subcontractor ${subcontractorId}`);
  }

  return uploadRecord;
};

/**
 * Get all uploads for a specific subcontractor
 * 
 * @param subcontractorId - The ID of the subcontractor
 * @returns Array of upload documents
 */
export const getSubcontractorUploads = async (subcontractorId: string) => {
  const subcontractor = await Subcontractor.findById(subcontractorId).populate('uploads');
  if (!subcontractor) {
    throw new Error('Subcontractor not found');
  }
  
  return subcontractor.uploads;
}; 