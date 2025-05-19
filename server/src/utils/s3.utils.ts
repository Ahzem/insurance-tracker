import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '../config/config';

/**
 * Types for file upload
 */
interface UploadedFile {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

// Initialize S3 client
const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId || '',
    secretAccessKey: config.aws.secretAccessKey || ''
  }
});

/**
 * Uploads an insurance certificate file to Amazon S3 bucket in the insurance-certificates directory
 * 
 * @param file - The file to upload
 * @param userId - The ID of the user uploading the file
 * @returns An object containing information about the uploaded file
 */
export const uploadToS3InsuranceCertificates = async (file: UploadedFile, userId: string) => {
  // Validate required AWS configuration
  if (!config.aws.accessKeyId || !config.aws.secretAccessKey || !config.aws.s3.bucketName) {
    console.error('AWS configuration is missing. Check environment variables.');
    throw new Error('AWS configuration is missing');
  }

  // Generate a unique filename to prevent collisions
  const fileExtension = file.originalname.split('.').pop();
  const storedName = `${uuidv4()}.${fileExtension}`;
  // Use insurance-certificates/ prefix for the S3 object key
  const s3ObjectKey = `insurance-certificates/${storedName}`;
  
  try {
    // Log file information
    console.log(`[FILE UPLOAD] ${file.originalname} (${file.size} bytes, ${file.mimetype})`);
    console.log(`User ID: ${userId}`);
    console.log(`Storing as: ${s3ObjectKey}`);
    
    // Set up the parameters for S3 upload
    const params = {
      Bucket: config.aws.s3.bucketName,
      Key: s3ObjectKey,
      Body: file.buffer,
      ContentType: file.mimetype
    };
    
    // Upload file to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    
    // Generate S3 URL for the uploaded file
    const getObjectParams = {
      Bucket: config.aws.s3.bucketName,
      Key: s3ObjectKey
    };
    const getCommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 * 24 * 7 });  // URL valid for 7 days
    
    console.log(`[S3 UPLOAD SUCCESS] Insurance certificate stored at: ${url}`);
    
    // Return information about the uploaded file
    return {
      originalName: file.originalname,
      storedName: s3ObjectKey,
      url,
      mimeType: file.mimetype,
      size: file.size,
      uploadDate: new Date(),
      uploadedBy: userId,
      description: ''
    };
  } catch (error: any) {
    console.error('[S3 UPLOAD ERROR]', error);
    throw new Error(`Failed to upload insurance certificate to S3: ${error.message}`);
  }
};


/**
 * Deletes a file from S3 bucket
 * 
 * @param storedName - The stored name of the file to delete
 * @returns Boolean indicating whether the deletion was successful
 */
export const deleteFromS3 = async (storedName: string): Promise<boolean> => {
  // Validate required AWS configuration
  if (!config.aws.accessKeyId || !config.aws.secretAccessKey || !config.aws.s3.bucketName) {
    console.error('AWS configuration is missing. Check environment variables.');
    throw new Error('AWS configuration is missing');
  }
  
  try {
    // Set up the parameters for S3 deletion
    const params = {
      Bucket: config.aws.s3.bucketName,
      Key: storedName
    };
    
    // Delete file from S3
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    
    console.log(`[S3 DELETE SUCCESS] Deleted file ${storedName} from S3`);
    return true;
  } catch (error: any) {
    console.error('[S3 DELETE ERROR]', error);
    return false;
  }
}; 