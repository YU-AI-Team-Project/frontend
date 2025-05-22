import apiRequest, { HttpMethod } from '../apiClient';
import { 
  InterestStockResponse, 
  InterestStockInfo
} from '../types';

/**
 * Get all interest stocks for a user
 */
export const getInterestStocks = async (userID: string): Promise<InterestStockInfo[]> => {
  const response = await apiRequest<InterestStockResponse>(`/stocks/interests/${userID}`);
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data?.interests || [];
};

/**
 * Add a stock to user's interest stocks
 * Note: This endpoint is not implemented in the backend yet
 */
export const addInterestStock = async (userID: string, stockCode: string): Promise<void> => {
  // Endpoint needs to be implemented in the backend
  throw new Error("This API endpoint is not implemented in the backend yet");
};

/**
 * Remove a stock from user's interest stocks
 * Note: This endpoint is not implemented in the backend yet
 */
export const removeInterestStock = async (userID: string, stockCode: string): Promise<void> => {
  // Endpoint needs to be implemented in the backend
  throw new Error("This API endpoint is not implemented in the backend yet");
}; 