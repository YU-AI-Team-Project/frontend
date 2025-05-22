import apiRequest, { HttpMethod } from './apiClient';
import { StockDetailResponse, InterestStockResponse } from './types';

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