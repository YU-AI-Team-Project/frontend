import React, { useState, useEffect } from "react";
import "./StockSidebar.css";
import { isAuthenticated, InterestStockInfo } from "../../api";

// 기본 종목 목록 정의
interface StockDisplay {
  name: string;
  symbol: string;
  price: number;
  change: number;
  category: "국내종목" | "해외종목" | "가상화폐";
}

const defaultStockList: StockDisplay[] = [
  { name: "삼성전자", symbol: "005930", price: 54300, change: -2.16, category: "국내종목" },
  { name: "에코프로", symbol: "086520", price: 50200, change: -1.57, category: "국내종목" },
  { name: "알테오젠", symbol: "196170", price: 356500, change: +1.57, category: "국내종목" },
  { name: "애플", symbol: "AAPL", price: 204.21, change: +0.65, category: "해외종목" },
  { name: "마이크로소프트", symbol: "MSFT", price: 432.35, change: -0.67, category: "해외종목" },
  { name: "테슬라", symbol: "TSLA", price: 286.49, change: -0.25, category: "해외종목" },
  { name: "비트코인", symbol: "KRW-BTC", price: 133810000, change: -1.36, category: "가상화폐" },
  { name: "이더리움", symbol: "KRW-ETH", price: 2575000, change: -1.0, category: "가상화폐" },
];

const categories = ["국내종목", "해외종목", "가상화폐"] as const;

const StockSidebar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>(""); 
  const [interestStocks, setInterestStocks] = useState<InterestStockInfo[]>([]);
  const [stockList, setStockList] = useState<StockDisplay[]>(defaultStockList);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // 로그인 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        setUserID("testuser"); // 테스트용 userID
      }
    };
    
    checkAuth();
  }, []);
  
  // 로그인 시 관심종목 가져오기
  useEffect(() => {
    if (isLoggedIn && userID) {
      fetchInterestStocks();
    }
  }, [isLoggedIn, userID]);
  
  // 관심종목 가져오기 (API 구현 전이므로 모의 데이터 사용)
  const fetchInterestStocks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 실제 API 구현이 되면 아래 코드를 사용하세요
      // const response = await fetch(`/api/stocks/interests/${userID}`);
      // const data = await response.json();
      // const interestStocksList = data.interests || [];
      
      // 임시 모의 데이터
      const interestStocksList: InterestStockInfo[] = [
        { stock_code: "005930", company_name: "삼성전자" },
        { stock_code: "035420", company_name: "NAVER" },
        { stock_code: "035720", company_name: "카카오" }
      ];
      
      setInterestStocks(interestStocksList);
      
      // 관심종목 정보를 표시용 형식으로 변환
      const stockItems: StockDisplay[] = interestStocksList.map(item => ({
        name: item.company_name,
        symbol: item.stock_code,
        price: 0, // 실제 가격 데이터 필요
        change: 0, // 실제 변동률 데이터 필요
        category: "국내종목" // 카테고리 정보 필요
      }));
      
      if (stockItems.length > 0) {
        setStockList(stockItems);
      } else {
        setStockList(defaultStockList);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '관심종목을 불러오는데 실패했습니다');
      console.error('관심종목 불러오기 오류:', err);
      setStockList(defaultStockList);
    } finally {
      setIsLoading(false);
    }
  };

  const getChangeClass = (change: number) => {
    if (change > 0) return "positive";
    if (change < 0) return "negative";
    return "neutral";
  };

  // 종목 추가 핸들러
  const handleAddStock = () => {
    alert('종목추가 기능은 추후 구현될 예정입니다.');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="menu-icon">☰</span>
        <span className="title">관심종목</span>
      </div>

      {isLoading ? (
        <div className="loading-state">로딩 중...</div>
      ) : error ? (
        <div className="error-state">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
          <button onClick={fetchInterestStocks}>재시도</button>
        </div>
      ) : (
        <>
          <button className="add-btn" onClick={handleAddStock}>+ 종목추가</button>

          {categories.map((cat) => {
            const categoryStocks = stockList.filter(stock => stock.category === cat);
            
            if (categoryStocks.length === 0) return null;
            
            return (
              <div key={cat} className="category-section">
                <div className="category-title">{cat}</div>
                {categoryStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    onClick={() => setSelectedSymbol(stock.symbol)}
                    className={`stock-item ${selectedSymbol === stock.symbol ? "selected" : ""}`}
                  >
                    <div className="stock-header">
                      <span>{stock.name}</span>
                      <span className={`change ${getChangeClass(stock.change)}`}>
                        {stock.change > 0 ? "+" : ""}
                        {stock.change}%
                      </span>
                    </div>
                    <div className="stock-sub">
                      {stock.symbol} · {stock.price.toLocaleString()}원
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default StockSidebar;


