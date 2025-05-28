import React, { createContext, useState, ReactNode, useContext } from 'react';
import { StockDetailResponse } from '../api/types';

interface StockContextType {
  stockData: StockDetailResponse | null;
  setStockData: (data: StockDetailResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  newsData: any[];
  setNewsData: (news: any[]) => void;
}

// 기본값을 가진 Context를 생성합니다
const StockContext = createContext<StockContextType>({
  stockData: null,
  setStockData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
  newsData: [],
  setNewsData: () => {},
});

interface StockProviderProps {
  children: ReactNode;
}

// Context Provider 컴포넌트
export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [stockData, setStockData] = useState<StockDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<any[]>([]);
  console.log(stockData);

  return (
    <StockContext.Provider
      value={{
        stockData,
        setStockData,
        isLoading,
        setIsLoading,
        error,
        setError,
        newsData,
        setNewsData,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

// 커스텀 훅으로 컨텍스트를 쉽게 사용 
export const useStock = () => useContext(StockContext);

export default StockContext; 