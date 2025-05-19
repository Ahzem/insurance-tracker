import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Subcontractor {
  _id?: string;
  businessName: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone?: string;
  insuranceContactName?: string;
  insuranceContactEmail?: string;
  insuranceContactPhone?: string;
  insuranceAgencyName?: string;
  uploads?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

export const fetchSubcontractors = async (): Promise<Subcontractor[]> => {
  try {
    const response = await axios.get<ApiResponse<Subcontractor[]>>(`${API_URL}/subcontractors`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching subcontractors:', error);
    throw error;
  }
};

export const fetchSubcontractorById = async (id: string): Promise<Subcontractor> => {
  try {
    const response = await axios.get<ApiResponse<Subcontractor>>(`${API_URL}/subcontractors/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching subcontractor with id ${id}:`, error);
    throw error;
  }
};

export const createSubcontractor = async (subcontractor: Omit<Subcontractor, '_id'>): Promise<Subcontractor> => {
  try {
    const response = await axios.post<ApiResponse<Subcontractor>>(`${API_URL}/subcontractors`, subcontractor);
    return response.data.data;
  } catch (error) {
    console.error('Error creating subcontractor:', error);
    throw error;
  }
};

export const updateSubcontractor = async (id: string, subcontractor: Partial<Subcontractor>): Promise<Subcontractor> => {
  try {
    const response = await axios.put<ApiResponse<Subcontractor>>(`${API_URL}/subcontractors/${id}`, subcontractor);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating subcontractor with id ${id}:`, error);
    throw error;
  }
};

export const deleteSubcontractor = async (id: string): Promise<void> => {
  try {
    await axios.delete<ApiResponse<{}>>(`${API_URL}/subcontractors/${id}`);
  } catch (error) {
    console.error(`Error deleting subcontractor with id ${id}:`, error);
    throw error;
  }
}; 