interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode: number;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

// 백엔드는 토큰 기반이 아닌 쿠키 기반 인증을 사용합니다
export const isAuthenticated = (): boolean => {
  // 백엔드와 직접 확인하는 것이 더 좋지만, 지금은 간단한 쿠키 확인을 사용합니다
  return document.cookie.includes('username=');
};

const createHeaders = (includeAuth: boolean = true): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  return headers;
};

export async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod = HttpMethod.GET,
  data?: any,
  includeAuth: boolean = true
): Promise<ApiResponse<T>> {
  try {
    // 상대 경로 사용
    const url = endpoint;
    const options: RequestInit = {
      method,
      headers: createHeaders(includeAuth),
      credentials: 'include', // 쿠키 기반 인증에 중요합니다
    };

    if (data && (method !== HttpMethod.GET)) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const statusCode = response.status;

    if (statusCode === 401) {
      // 인증 오류 처리 - 로그인 페이지로 리디렉션
      window.location.href = '/auth/login';
      return { statusCode, error: 'Authentication required' };
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      const responseData = await response.json();
      
      if (statusCode >= 200 && statusCode < 300) {
        return { 
          data: responseData, 
          statusCode 
        };
      } else {
        return { 
          error: responseData.message || '오류가 발생했습니다',
          statusCode
        };
      }
    } else {
      // JSON이 아닌 응답 처리
      const text = await response.text();
      if (statusCode >= 200 && statusCode < 300) {
        return { data: text as unknown as T, statusCode };
      } else {
        return { 
          error: text || '오류가 발생했습니다',
          statusCode
        };
      }
    }
  } catch (error) {
    console.error('API 요청 실패:', error);
    return { 
      error: error instanceof Error ? error.message : '네트워크 오류',
      statusCode: 0
    };
  }
}

export default apiRequest; 