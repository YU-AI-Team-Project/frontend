import React, { useState, useEffect } from "react";
import "./StockSidebar.css";
import { useAuth } from "../../context/AuthContext";
import { watchlistApi, InterestStockInfo } from "../../api";

// 기본 종목 목록 정의 (관심종목이 없을 때 표시용)
interface StockDisplay {
  name: string;
  symbol: string;
  price: number;
  change: number;
  isInterest?: boolean; // 관심종목 여부 추가
}

const StockSidebar: React.FC = () => {
  const { isAuthenticated, username } = useAuth(); // AuthContext 사용
  const [interestStocks, setInterestStocks] = useState<InterestStockInfo[]>([]);
  const [stockList, setStockList] = useState<StockDisplay[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newStockCode, setNewStockCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  // 로그인 시 관심종목 가져오기
  useEffect(() => {
    if (isAuthenticated && username) {
      fetchInterestStocks();
    } else {
      // 로그아웃 상태일 때 기본 상태로 초기화
      setInterestStocks([]);
      setStockList([]);
      setError(null);
      setMessage('');
    }
  }, [isAuthenticated, username]);
  
  // 관심종목 가져오기 (백엔드에서 가격 정보 포함하여 반환)
  const fetchInterestStocks = async () => {
    if (!username) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // 관심종목 목록 가져오기 (가격 정보 포함)
      const interestStocksList = await watchlistApi.getInterestStocks(username);
      setInterestStocks(interestStocksList);
      
      if (interestStocksList.length === 0) {
        setStockList([]);
        return;
      }
      
      // 백엔드에서 받은 가격 정보를 바로 사용
      const stockDetails: StockDisplay[] = interestStocksList.map(interestStock => ({
        name: interestStock.company_name,
        symbol: interestStock.stock_code,
        price: interestStock.current_price || 0,
        change: interestStock.day_change_percent || 0,
        isInterest: true
      }));
      
      setStockList(stockDetails);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '관심종목을 불러오는데 실패했습니다');
      console.error('관심종목 불러오기 오류:', err);
      setStockList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 관심종목 추가
  const handleAddStock = async () => {
    if (!newStockCode.trim()) {
      setMessage('종목 코드를 입력해주세요.');
      return;
    }

    if (!isAuthenticated || !username) {
      setMessage('로그인이 필요합니다.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await watchlistApi.addInterestStock(username, newStockCode.trim());
      setMessage(response.message);
      setNewStockCode('');
      setShowAddForm(false);
      
      // 관심종목 목록 새로고침 (상세 정보 포함)
      await fetchInterestStocks();
    } catch (error) {
      setMessage(`관심종목 추가 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 관심종목 삭제
  const handleRemoveStock = async (stockCode: string) => {
    if (!isAuthenticated || !username) {
      setMessage('로그인이 필요합니다.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await watchlistApi.removeInterestStock(username, stockCode);
      setMessage(response.message);
      
      // 관심종목 목록 새로고침 (상세 정보 포함)
      await fetchInterestStocks();
    } catch (error) {
      setMessage(`관심종목 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 관심종목 토글 (추가/삭제) - 현재 목록에 있는 주식은 모두 관심종목이므로 삭제만 가능
  const handleToggleInterest = async (stock: StockDisplay) => {
    if (stock.isInterest) {
      await handleRemoveStock(stock.symbol);
    }
  };

  const getChangeClass = (change: number) => {
    if (change > 0) return "positive";
    if (change < 0) return "negative";
    return "neutral";
  };

  // 메시지 자동 숨김
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="menu-icon">☰</span>
        <span className="title">관심종목</span>
        {isAuthenticated && username && (
          <span className="user-info">({username})</span>
        )}
      </div>

      {/* 메시지 표시 */}
      {message && (
        <div className={`message ${message.includes('실패') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {isLoading ? (
        <div className="loading-state">로딩 중...</div>
      ) : error ? (
        <div className="error-state">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
          <button onClick={fetchInterestStocks}>재시도</button>
        </div>
      ) : (
        <>
          {/* 종목 추가 버튼 */}
          {!showAddForm ? (
            <button 
              className="add-btn" 
              onClick={() => setShowAddForm(true)}
              disabled={!isAuthenticated}
            >
              + 종목추가
            </button>
          ) : (
            <div className="add-stock-form">
              <input
                type="text"
                value={newStockCode}
                onChange={(e) => setNewStockCode(e.target.value)}
                placeholder="종목코드 입력 (예: 005930)"
                disabled={isLoading}
              />
              <div className="form-buttons">
                <button onClick={handleAddStock} disabled={isLoading}>
                  추가
                </button>
                <button onClick={() => {
                  setShowAddForm(false);
                  setNewStockCode('');
                }}>
                  취소
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="login-notice">
              로그인 후 관심종목을 관리할 수 있습니다.
            </div>
          )}

          {isAuthenticated && stockList.length === 0 && !isLoading && (
            <div className="empty-notice">
              관심종목이 없습니다. 위의 '+ 종목추가' 버튼을 클릭하여 관심종목을 추가해보세요.
            </div>
          )}

          {stockList.map((stock) => (
            <div
              key={stock.symbol}
              className={`stock-item ${selectedSymbol === stock.symbol ? "selected" : ""}`}
            >
              <div 
                onClick={() => setSelectedSymbol(stock.symbol)}
                className="stock-content"
              >
                <div className="stock-header">
                  <span>{stock.name}</span>
                  <span className={`change ${getChangeClass(stock.change)}`}>
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </span>
                </div>
                <div className="stock-sub">
                  {stock.symbol} · {stock.price > 0 ? stock.price.toLocaleString() : '-'}원
                </div>
              </div>
              <button
                className="interest-btn active"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleInterest(stock);
                }}
                disabled={isLoading}
                title="관심종목에서 제거"
              >
                ★
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default StockSidebar;


