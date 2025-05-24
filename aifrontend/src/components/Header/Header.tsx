import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStock } from '../../context/StockContext';
import { useAuth } from '../../context/AuthContext';
import { stockApi } from '../../api';

interface HeaderProps {
  // Define props if needed
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [stockCode, setStockCode] = useState<string>('');
  const { setStockData, isLoading, setIsLoading, error, setError } = useStock();
  const { isAuthenticated, username, logout } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);

  // Style from Figma: 'Header' (5:4) has fills: fill_YIS6OE ('#FFFFFF')
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '10px 20px', // Basic padding, can be adjusted
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E0E0E0', // A light border to distinguish from content
  };

  // Style from Figma: 'AlphaSquare Logo' (5:8) textStyle: style_CMFS79
  const logoStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '18px',
    cursor: 'pointer',
    // color: '#000000' // fill_I931BD - default black, often not needed to specify
  };

  // Style from Figma: 'Search Bar' (5:10) has fills: fill_9FOGMN ('#F2F2F2')
  const searchBarStyle: React.CSSProperties = {
    backgroundColor: '#F2F2F2',
    padding: '8px 12px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1, // Allow search bar to take available space
    margin: '0 20px',
    position: 'relative' as 'relative',
  };

  // Style from Figma: 'Search Placeholder' (5:11) textStyle: style_BBQ3HB
  const searchPlaceholderStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    color: '#000000', // fill_I931BD
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
  };

  // 에러 메시지 스타일
  const errorMessageStyle: React.CSSProperties = {
    color: '#ff3b30',
    fontSize: '12px',
    position: 'absolute',
    bottom: '-20px',
    left: '0',
    width: '100%',
    textAlign: 'center'
  };

  // 검색 버튼 스타일
  const searchButtonStyle: React.CSSProperties = {
    backgroundColor: '#007AFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    marginLeft: '10px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  // Style for Icons (5:12 - 5:16), fills: fill_SSJY87 ('#CCCCCC')
  const iconStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#F0F0F0',
    padding: '8px 15px',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #DCDCDC'
  };

  // 로그인된 사용자 정보 스타일
  const userInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    border: '1px solid #2196F3',
    borderRadius: '20px',
    padding: '6px 12px',
    marginLeft: '10px',
  };

  const userAvatarStyle: React.CSSProperties = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#2196F3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '8px',
  };

  const userNameStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#1976D2',
    marginRight: '12px',
  };

  const logoutButtonStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    color: '#666',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '4px 8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  // 로그인 페이지로 이동하는 함수
  const handleLoginClick = () => {
    navigate('/login');
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignupClick = () => {
    navigate('/signup');
  };

  // 로그아웃 함수
  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  // 홈으로 이동하는 함수
  const handleLogoClick = () => {
    navigate('/');
  };

  // 종목 코드 변경 핸들러
  const handleStockCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockCode(e.target.value);
    setError(null); // 입력이 바뀌면 에러 초기화
  };

  // 종목 검색 함수
  const searchStock = useCallback(async () => {
    if (!stockCode.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // stockApi.getStockDetail 함수를 사용하여 종목 정보 조회
      const stockDetail = await stockApi.getStockDetail(stockCode);
      
      // Context를 통해 데이터 저장
      setStockData(stockDetail);
      
    } catch (err) {
      console.error("종목 검색 오류:", err);
      setError("종목을 찾을 수 없습니다. 정확한 종목 코드를 입력해주세요.");
    } finally {
      setIsLoading(false);
    }
  }, [stockCode, navigate, setStockData, setIsLoading, setError]);

  // 엔터 키 입력 시 종목 검색
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchStock();
    }
  };

  // 사용자명의 첫 글자 가져오기 (아바타용)
  const getUserInitial = (name: string | null) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={logoStyle} onClick={handleLogoClick}>알파스퀘어</div>
      </div>
      <div style={searchBarStyle} ref={searchRef}>
        <input 
          id="stock-search-input"
          type="text" 
          placeholder="종목 코드를 입력하세요 (예: 005930)" 
          style={searchPlaceholderStyle}
          value={stockCode}
          onChange={handleStockCodeChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button 
          style={searchButtonStyle} 
          onClick={searchStock}
          disabled={isLoading || !stockCode.trim()}
        >
          {isLoading ? '검색 중...' : '검색'}
        </button>
        {error && <div style={errorMessageStyle}>{error}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isAuthenticated ? (
          <div style={userInfoStyle}>
            <div style={userAvatarStyle}>
              {getUserInitial(username)}
            </div>
            <span style={userNameStyle}>{username}님</span>
            <button 
              style={logoutButtonStyle}
              onClick={handleLogoutClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
                e.currentTarget.style.borderColor = '#999';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.borderColor = '#ddd';
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <div style={iconStyle} onClick={handleLoginClick}>로그인</div>
            <div style={iconStyle} onClick={handleSignupClick}>회원가입</div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 