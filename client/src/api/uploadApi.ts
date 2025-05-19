import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface UploadResponse {
  _id: string;
  originalName: string;
  storedName: string;
  url: string;
  mimeType: string;
  size?: number;
  uploadDate: Date;
  uploadedBy: string;
  description: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * Upload a file for a specific subcontractor
 * Note: This creates a database record but the file is not actually stored permanently
 * 
 * @param subcontractorId - ID of the subcontractor
 * @param file - The file to upload
 * @param description - Optional description of the file
 * @returns The upload response data with database record information
 */
export const uploadSubcontractorCertificate = async (
  subcontractorId: string,
  file: File,
  description: string = ''
): Promise<UploadResponse> => {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('certificate', file);
    
    if (description) {
      formData.append('description', description);
    }
    
    // For simplicity, we're using a placeholder userId
    // In a real app, this would come from authentication
    formData.append('userId', '000000000000000000000000');
    
    const response = await axios.post<ApiResponse<UploadResponse>>(
      `${API_URL}/uploads/${subcontractorId}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    console.log('Upload response message:', response.data.message);
    return response.data.data;
  } catch (error) {
    console.error('Error uploading certificate:', error);
    throw error;
  }
};

/**
 * Get all uploads for a specific subcontractor
 * 
 * @param subcontractorId - ID of the subcontractor
 * @returns Array of upload response data
 */
export const getSubcontractorUploads = async (
  subcontractorId: string
): Promise<UploadResponse[]> => {
  try {
    const response = await axios.get<ApiResponse<UploadResponse[]>>(
      `${API_URL}/uploads/${subcontractorId}/uploads`
    );
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching uploads:', error);
    throw error;
  }
}; 