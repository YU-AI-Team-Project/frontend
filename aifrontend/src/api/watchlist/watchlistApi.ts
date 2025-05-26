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
 * 사용자의 관심종목 목록 조회
 */
export const getInterestStocks = async (userID: string): Promise<InterestStockInfo[]> => {
  const response = await apiRequest<InterestStockResponse>(`/stocks/interests/${userID}`);
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data?.interests || [];
};

/**
 * 사용자의 관심종목에 종목 추가
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
 * 사용자의 관심종목에서 종목 삭제
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