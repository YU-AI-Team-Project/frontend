export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// 새로운 백엔드 API에 맞는 타입 정의
export interface StockDetail {
  code: string;
  company_name: string;
  financial_info: string;
  report_url: string;
}

export interface FinancialStatement {
  report_period: string;
  report_type: string;
  revenue: number;
  operating_income: number;
  net_income: number;
  assets: number;
  liabilities: number;
  equity: number;
}

export interface MarketIndicator {
  date: string;
  market_cap: number;
  per: number;
  pbr: number;
  eps: number;
  bps: number;
  dividend_yield: number;
  close_price: number;
}

export interface EarningsForecast {
  fiscal_year: string;
  expected_eps: number;
  expected_revenue: number;
  expected_operating_income: number;
  source: string;
}

export interface StockDetailResponse {
  stock: StockDetail;
  financial_statements: FinancialStatement[];
  market_indicators: MarketIndicator[];
  earnings_forecasts: EarningsForecast[];
}

export interface InterestStockInfo {
  stock_code: string;
  company_name: string;
}

export interface InterestStockResponse {
  interests: InterestStockInfo[];
} 