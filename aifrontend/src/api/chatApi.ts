import apiRequest, { HttpMethod } from './apiClient';
import {
  ChatRequest,
  ChatResponse,
  RagChatRequest,
  RagChatResponse
} from './types';

/**
 * RAG 기반 채팅 응답 생성
 */
export const chatWithRag = async (request: RagChatRequest): Promise<RagChatResponse> => {
  try {
    console.log('RAG 채팅 요청:', request);
    const response = await apiRequest<RagChatResponse>(
      '/chats/rag',
      HttpMethod.POST,
      request
    );

    console.log('RAG 채팅 응답:', response);
    
    if (response.error) {
      throw new Error(`API 오류 (${response.statusCode}): ${response.error}`);
    }

    return response.data as RagChatResponse;
  } catch (error) {
    console.error('RAG 채팅 요청 실패:', error);
    throw new Error(error instanceof Error ? error.message : 'RAG 채팅 요청 실패');
  }
};

/**
 * 채팅 기록 불러오기
 */
export const getChatHistory = async (userID: string, stock_code: string, limit: number = 100): Promise<ChatResponse[]> => {
  try {
    const queryParams = new URLSearchParams({
      limit: limit.toString()
    });

    const response = await apiRequest<ChatResponse[]>(
      `/chats/${encodeURIComponent(userID)}/${encodeURIComponent(stock_code)}?${queryParams.toString()}`,
      HttpMethod.GET
    );

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data as ChatResponse[];
  } catch (error) {
    console.error('채팅 기록 조회 실패:', error);
    throw new Error(error instanceof Error ? error.message : '채팅 기록 조회 실패');
  }
};

/**
 * 채팅 기록 저장하기
 */
export const saveChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await apiRequest<ChatResponse>(
      '/chats/',
      HttpMethod.POST,
      request
    );

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data as ChatResponse;
  } catch (error) {
    console.error('채팅 메시지 저장 실패:', error);
    throw new Error(error instanceof Error ? error.message : '채팅 메시지 저장 실패');
  }
};

/**
 * 채팅 기록 삭제하기
 */
export const deleteChatHistory = async (userID: string, stock_code: string): Promise<{ message: string }> => {
  try {
    const response = await apiRequest<{ message: string }>(
      `/chats/${encodeURIComponent(userID)}/${encodeURIComponent(stock_code)}`,
      HttpMethod.DELETE
    );

    if (response.error) {
      throw new Error(response.error);
    }

    return response.data as { message: string };
  } catch (error) {
    console.error('채팅 기록 삭제 실패:', error);
    throw new Error(error instanceof Error ? error.message : '채팅 기록 삭제 실패');
  }
}; 