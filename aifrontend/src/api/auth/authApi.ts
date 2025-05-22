import apiRequest, { HttpMethod } from '../apiClient';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
}

/**
 * 쿠키 기반 인증을 사용하여 사용자 로그인 (JSON만 처리)
 */
export const login = async (credentials: LoginCredentials): Promise<{ message: string; username?: string }> => {
  try {
    // FormData 생성 (백엔드가 Form 데이터를 사용함)
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch('/login', {
      method: 'POST',
      body: formData,
      credentials: 'include', // 쿠키 기반 인증에 중요
    });

    console.log('Login response status:', response.status);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '로그인 실패');
    }
    
    return { 
      message: data.message || '로그인 성공',
      username: data.username
    };
  } catch (error) {
    console.error('로그인 요청 중 오류:', error);
    
    // JSON 파싱 오류 처리
    if (error instanceof SyntaxError) {
      throw new Error('서버 응답이 유효한 JSON 형식이 아닙니다');
    }
    
    // 네트워크 오류 처리
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인하세요.');
    }
    
    throw new Error(error instanceof Error ? error.message : '로그인 실패');
  }
};

/**
 * 새 사용자 계정 등록
 */
export const signup = async (userData: SignupCredentials): Promise<{ message: string }> => {
  // 백엔드 호환성을 위해 FormData 생성
  const formData = new FormData();
  formData.append('username', userData.username);
  formData.append('password', userData.password);

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || data.message || '회원가입 실패');
    }

    return data;
  } catch (error) {
    // TypeError는 주로 "Failed to fetch" 오류를 의미
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('API 요청 실패:', error);
      throw new Error('서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인하세요.');
    }
    
    throw new Error(error instanceof Error ? error.message : '회원가입 실패');
  }
};

/**
 * 사용자 로그아웃
 */
export const logout = async (): Promise<{ message: string }> => {
  try {
    const response = await fetch('/logout', {
      method: 'GET',
      credentials: 'include',
    });
    
    console.log('Logout response status:', response.status);
    
    if (!response.ok) {
      throw new Error('로그아웃 처리 중 오류가 발생했습니다');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('로그아웃 요청 중 오류:', error);
    throw new Error('로그아웃 실패');
  }
};

/**
 * 사용자 인증 상태 확인
 */
export const checkAuth = async (): Promise<{ isAuthenticated: boolean, username?: string }> => {
  try {
    const response = await fetch('/', {
      method: 'GET',
      credentials: 'include', // 쿠키를 포함
    });

    console.log('Auth check status:', response.status);

    if (!response.ok) {
      return { isAuthenticated: false };
    }

    const text = await response.text();
    console.log('Auth check response text:', text);
    
    // 응답에 사용자 이름이 포함되어 있으면 인증된 것으로 간주
    if (text.includes('님 환영합니다')) {
      // 사용자 이름 추출 (예: "username님 환영합니다" -> "username")
      const username = text.split('님 환영합니다')[0];
      return { isAuthenticated: true, username };
    }
    
    return { isAuthenticated: false };
  } catch (error) {
    console.error('인증 확인 요청 중 오류:', error);
    return { isAuthenticated: false };
  }
};