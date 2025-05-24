export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// 새로운 백엔드 API에 맞는 타입 정의
export interface StockDetail {
  code: string;
  company_name: string;
  financial_info?: string;
  report_url?: string;
  industry?: string;
  sector?: string;
  business_summary?: string;
}

export interface FinancialStatement {
  report_period: string;
  report_type: string;
  revenue?: number;
  operating_income?: number;
  net_income?: number;
  assets?: number;
  liabilities?: number;
  equity?: number;
  gross_profits?: number;
  ebitda?: number;
  operating_cashflow?: number;
  free_cashflow?: number;
  revenue_per_share?: number;
  gross_margins?: number;
  ebitda_margins?: number;
  operating_margins?: number;
  return_on_assets?: number;
  return_on_equity?: number;
  debt_to_equity?: number;
  quick_ratio?: number;
  current_ratio?: number;
  earnings_growth?: number;
  revenue_growth?: number;
  enterprise_value?: number;
  enterprise_to_revenue?: number;
  enterprise_to_ebitda?: number;
}

export interface MarketIndicator {
  date: string;
  market_cap?: number;
  per?: number;
  pbr?: number;
  eps?: number;
  bps?: number;
  dividend_yield?: number;
  close_price?: number;
  market?: string;
  exchange?: string;
  currency?: string;
  previous_close?: number;
  open?: number;
  current_price?: number;
  day_low?: number;
  day_high?: number;
  volume?: number;
  average_volume?: number;
  pe_ratio_trailing?: number;
  pe_ratio_forward?: number;
  eps_forward?: number;
  eps_current_year?: number;
  price_eps_current_year?: number;
  beta?: number;
  dividend_rate?: number;
  dividend_date?: string;
  ex_dividend_date?: string;
  payout_ratio?: number;
  book_value?: number;
  fifty_two_week_low?: number;
  fifty_two_week_high?: number;
  fifty_two_week_change_percent?: number;
}

export interface EarningsForecast {
  fiscal_year: string;
  expected_eps?: number;
  expected_revenue?: number;
  expected_operating_income?: number;
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

// 관심종목 추가 요청 타입
export interface InterestStockAddRequest {
  userID: string;
  stock_code: string;
}

// 관심종목 추가 응답 타입
export interface InterestStockAddResponse {
  message: string;
  interest: InterestStockInfo;
}

// 관심종목 삭제 요청 타입
export interface InterestStockRemoveRequest {
  userID: string;
  stock_code: string;
}

// 관심종목 삭제 응답 타입
export interface InterestStockRemoveResponse {
  message: string;
} 