import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { stockApi } from '../../api';
import { useStock } from '../../context/StockContext';

interface HeaderProps {
  // Define props if any
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [stockCode, setStockCode] = useState<string>('');
  const { setStockData, isLoading, setIsLoading, error, setError } = useStock();
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

  // 로그인 페이지로 이동하는 함수
  const handleLoginClick = () => {
    navigate('/login');
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignupClick = () => {
    navigate('/signup');
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
        <div style={iconStyle} onClick={handleLoginClick}>로그인</div>
        <div style={iconStyle} onClick={handleSignupClick}>회원가입</div>
      </div>
    </header>
  );
};

export default Header; 