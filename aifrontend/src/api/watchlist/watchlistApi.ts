import apiRequest, { HttpMethod } from '../apiClient';
import { 
  InterestStockResponse, 
  InterestStockInfo,
  InterestStockAddRequest,
  InterestStockAddResponse,
  InterestStockRemoveRequest,
  InterestStockRemoveResponse
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
 */
export const addInterestStock = async (userID: string, stockCode: string): Promise<InterestStockAddResponse> => {
  const requestData: InterestStockAddRequest = {
    userID,
    stock_code: stockCode
  };

  const response = await apiRequest<InterestStockAddResponse>(
    '/stocks/interests',
    HttpMethod.POST,
    requestData
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  if (!response.data) {
    throw new Error('관심종목 추가 응답 데이터가 없습니다');
  }
  
  return response.data;
};

/**
 * Remove a stock from user's interest stocks
 */
export const removeInterestStock = async (userID: string, stockCode: string): Promise<InterestStockRemoveResponse> => {
  const requestData: InterestStockRemoveRequest = {
    userID,
    stock_code: stockCode
  };

  const response = await apiRequest<InterestStockRemoveResponse>(
    '/stocks/interests',
    HttpMethod.DELETE,
    requestData
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  if (!response.data) {
    throw new Error('관심종목 삭제 응답 데이터가 없습니다');
  }
  
  return response.data;
}; 