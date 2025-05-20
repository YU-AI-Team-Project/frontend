const API_BASE_URL = 'https://api.example.com';

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

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

const createHeaders = (includeAuth: boolean = true): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
  }

  return headers;
};

export async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod = HttpMethod.GET,
  data?: any,
  includeAuth: boolean = true
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: createHeaders(includeAuth),
    };

    if (data && (method !== HttpMethod.GET)) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const statusCode = response.status;

    if (statusCode === 401) {
      // Handle authentication error - could redirect to login or clear token
      localStorage.removeItem('authToken');
      window.location.href = '/login';
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
          error: responseData.message || 'An error occurred',
          statusCode
        };
      }
    } else {
      // Handle non-JSON response
      const text = await response.text();
      if (statusCode >= 200 && statusCode < 300) {
        return { data: text as unknown as T, statusCode };
      } else {
        return { 
          error: text || 'An error occurred',
          statusCode
        };
      }
    }
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      error: error instanceof Error ? error.message : 'Network error',
      statusCode: 0
    };
  }
}

export default apiRequest; 