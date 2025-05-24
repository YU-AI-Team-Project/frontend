import apiRequest, { HttpMethod } from './apiClient';
import { 
  StockDetailResponse, 
  InterestStockResponse,
  InterestStockAddRequest,
  InterestStockAddResponse,
  InterestStockRemoveRequest,
  InterestStockRemoveResponse
} from './types';


const BASE_API_URL = 'http://localhost:8080'; 

/**
 * 특정 종목 코드로 주식 상세 정보 조회
 */
export const getStockDetail = async (stockCode: string): Promise<StockDetailResponse> => {
  try {
    const response = await apiRequest<StockDetailResponse>(
      `/stocks/${stockCode}`,
      HttpMethod.GET
    );

    if (response.error) {
      throw new Error(response.error);
    }
    console.log(response.data);

    return response.data as StockDetailResponse;
  } catch (error) {
    console.error(`${stockCode} 종목의 상세 정보 조회 실패:`, error);
    throw new Error(error instanceof Error ? error.message : '종목 상세 정보 조회 실패');
  }
};

/**
 * 사용자의 관심 종목 목록 조회
 */
export const getInterestStocks = async (userID: string): Promise<InterestStockResponse> => {
  try {
    const response = await apiRequest<InterestStockResponse>(
      `/stocks/interests/${userID}`,
      HttpMethod.GET
    );

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data as InterestStockResponse;
  } catch (error) {
    console.error(`사용자 ${userID}의 관심 종목 조회 실패:`, error);
    throw new Error(error instanceof Error ? error.message : '관심 종목 조회 실패');
  }
};

/**
 * 관심종목 추가
 */
export const addInterestStock = async (userID: string, stockCode: string): Promise<InterestStockAddResponse> => {
  try {
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

    return response.data as InterestStockAddResponse;
  } catch (error) {
    console.error(`관심종목 추가 실패 (${stockCode}):`, error);
    throw new Error(error instanceof Error ? error.message : '관심종목 추가 실패');
  }
};

/**
 * 관심종목 삭제
 */
export const removeInterestStock = async (userID: string, stockCode: string): Promise<InterestStockRemoveResponse> => {
  try {
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

    return response.data as InterestStockRemoveResponse;
  } catch (error) {
    console.error(`관심종목 삭제 실패 (${stockCode}):`, error);
    throw new Error(error instanceof Error ? error.message : '관심종목 삭제 실패');
  }
};

// 종목 검색 결과 타입 정의
export interface StockSearchResult {
  code: string;
  company_name: string;
}
