import apiRequest, { HttpMethod } from '../apiClient';
import { LoginRequest, LoginResponse, RegisterRequest, UserProfile } from '../types';

/**
 * Login user and receive authentication token
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiRequest<LoginResponse>(
    '/auth/login', 
    HttpMethod.POST, 
    credentials,
    false
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  if (response.data?.token) {
    // Store the token in localStorage
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data as LoginResponse;
};

/**
 * Register a new user account
 */
export const register = async (userData: RegisterRequest): Promise<UserProfile> => {
  const response = await apiRequest<UserProfile>(
    '/auth/register', 
    HttpMethod.POST, 
    userData,
    false
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data as UserProfile;
};

/**
 * Logout user - clear token from localStorage
 */
export const logout = (): void => {
  localStorage.removeItem('authToken');
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await apiRequest<UserProfile>('/auth/me');
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data as UserProfile;
};

/**
 * Update user profile
 */
export const updateProfile = async (userData: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await apiRequest<UserProfile>(
    '/auth/profile', 
    HttpMethod.PUT, 
    userData
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data as UserProfile;
};

/**
 * Change user password
 */
export const changePassword = async (
  currentPassword: string, 
  newPassword: string
): Promise<void> => {
  const response = await apiRequest<void>(
    '/auth/password', 
    HttpMethod.PUT, 
    { currentPassword, newPassword }
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
}; 