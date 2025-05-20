import React, { useState, useEffect } from "react";
import "./StockSidebar.css";
import { watchlistApi, isAuthenticated, StockItem, Watchlist, WatchlistSummary } from "../../api";

// Default stock list shown when user is not logged in
const defaultStockList: StockItem[] = [
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
  const [watchlists, setWatchlists] = useState<WatchlistSummary[]>([]);
  const [activeWatchlist, setActiveWatchlist] = useState<Watchlist | null>(null);
  const [stockList, setStockList] = useState<StockItem[]>(defaultStockList);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
    };
    
    checkAuth();
  }, []);
  
  // Fetch watchlist summaries when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchWatchlists();
    }
  }, [isLoggedIn]);
  
  // Fetch watchlist summaries
  const fetchWatchlists = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const watchlistSummaries = await watchlistApi.getAllWatchlists();
      setWatchlists(watchlistSummaries);
      
      // Load the first watchlist's details if available
      if (watchlistSummaries.length > 0) {
        await loadWatchlist(watchlistSummaries[0].id);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch watchlists');
      console.error('Error fetching watchlists:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load a specific watchlist's details
  const loadWatchlist = async (watchlistId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const watchlistData = await watchlistApi.getWatchlist(watchlistId);
      setActiveWatchlist(watchlistData);
      setStockList(watchlistData.stocks || []);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load watchlist');
      console.error('Error loading watchlist:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle watchlist change
  const handleWatchlistChange = async (watchlistId: string) => {
    await loadWatchlist(watchlistId);
  };

  const getChangeClass = (change: number) => {
    if (change > 0) return "positive";
    if (change < 0) return "negative";
    return "neutral";
  };

  // Add stock to watchlist
  const handleAddStock = () => {
    // This would typically open a modal to search and add stocks
    alert('종목추가 기능은 추후 구현될 예정입니다.');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="menu-icon">☰</span>
        {isLoggedIn && watchlists.length > 0 ? (
          <select 
            className="watchlist-selector" 
            value={activeWatchlist?.id || ''} 
            onChange={(e) => handleWatchlistChange(e.target.value)}
          >
            {watchlists.map(list => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="title">새 관심목록</span>
        )}
      </div>

      {isLoading ? (
        <div className="loading-state">로딩 중...</div>
      ) : error ? (
        <div className="error-state">
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
          <button onClick={fetchWatchlists}>재시도</button>
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


