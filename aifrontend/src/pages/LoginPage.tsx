import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();

  // 이미 로그인되어 있는지 확인
  useEffect(() => {
    if (isAuthenticated) {
      // 이미 로그인되어 있으면 메인 페이지로 리디렉션
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      // AuthContext의 login 함수 사용
      await login({ username, password });
      
      // 로그인 성공 메시지 표시
      setSuccessMessage('로그인 성공! 메인 페이지로 이동합니다...');
      
      console.log('로그인 성공, 인증 상태 업데이트됨');
      
      // 잠시 후 메인 페이지로 이동 (사용자에게 성공 메시지를 볼 시간을 주기 위함)
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">로그인</h2>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading || !!successMessage}
              placeholder="아이디를 입력하세요"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading || !!successMessage}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading || !!successMessage}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        
        <div className="signup-link">
          <p>계정이 없으신가요? <button onClick={handleSignupClick}>회원가입</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 