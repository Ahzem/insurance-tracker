import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (userData: RegisterData): Promise<User> => {
  try {
    const response = await axios.post<ApiResponse<User>>(`${API_URL}/auth/register`, userData);
    return response.data.data;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw error.response?.data?.error || 'Failed to register user';
  }
};

export const login = async (credentials: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<ApiResponse<AuthResponse>>(`${API_URL}/auth/login`, credentials);
    const authData = response.data.data;
    
    // Store token in localStorage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    
    return authData;
  } catch (error: any) {
    console.error('Error logging in:', error);
    throw error.response?.data?.error || 'Failed to log in';
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
}; 