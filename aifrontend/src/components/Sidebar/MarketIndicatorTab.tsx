import React from 'react';
import { MarketIndicator } from '../../api/types';

interface MarketIndicatorTabProps {
  marketIndicators: MarketIndicator[];
  hasRealData: boolean;
}

const MarketIndicatorTab: React.FC<MarketIndicatorTabProps> = ({ 
  marketIndicators, 
  hasRealData 
}) => {
  // 테이블 스타일
  const tableAreaStyle: React.CSSProperties = {
    flexGrow: 1,
  };

  const tableHeaderStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '5px',
  };

  const tableRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    marginBottom: '8px',
    padding: '4px 0',
    borderBottom: '1px solid #f5f5f5',
  };
  
  const tableLabelStyle: React.CSSProperties = {
    flexBasis: '50%',
    fontWeight: 500,
  };

  const tableValueStyle: React.CSSProperties = {
    flexBasis: '50%',
    textAlign: 'right',
    fontWeight: 500,
  };

  const sectionHeaderStyle: React.CSSProperties = {
    ...tableHeaderStyle,
    marginTop: '15px',
    fontWeight: 600,
    color: '#333',
  };

  // Mock 시장지표 데이터
  const mockMarketIndicators: MarketIndicator[] = [
    {
      date: '2024-12-20',
      market_cap: 3500000000000,
      per: 28.5,
      pbr: 6.8,
      eps: 6.42,
      bps: 26.85,
      dividend_yield: 0.0044,
      close_price: 183.25,
      current_price: 185.50,
      previous_close: 183.25,
      open: 184.00,
      day_low: 182.15,
      day_high: 186.20,
      volume: 45623000,
      average_volume: 52100000,
      pe_ratio_trailing: 28.5,
      pe_ratio_forward: 25.2,
      eps_forward: 7.36,
      eps_current_year: 6.42,
      price_eps_current_year: 28.9,
      beta: 1.24,
      dividend_rate: 0.82,
      dividend_date: '2024-11-07',
      ex_dividend_date: '2024-11-01',
      payout_ratio: 0.154,
      book_value: 26.85,
      fifty_two_week_low: 164.08,
      fifty_two_week_high: 199.62,
      fifty_two_week_change_percent: 0.127,
      market: 'NASDAQ',
      exchange: 'NASDAQ',
      currency: 'USD'
    }
  ];

  // 실제 데이터가 있으면 사용하고, 없으면 mock 데이터 사용
  const displayData = marketIndicators.length > 0 ? marketIndicators : mockMarketIndicators;
  const latestIndicator = displayData[0]; // 가장 최신 데이터 사용

  // 숫자 포맷 함수
  const formatNumber = (value: number | null | undefined, decimals: number = 0) => {
    if (value === null || value === undefined) return '-';
    
    const billion = 1000000000000;
    const million = 100000000;
    const thousand = 10000;
    
    const absValue = Math.abs(Number(value));
    
    if (absValue >= billion) {
      return (Math.round(absValue / billion * 10) / 10).toLocaleString() + '조';
    } else if (absValue >= million) {
      return Math.round(absValue / million).toLocaleString() + '억';
    } else if (absValue >= thousand) {
      return Math.round(absValue / thousand).toLocaleString() + '만';
    } else {
      return Number(value).toFixed(decimals);
    }
  };

  // 가격 포맷 함수
  const formatPrice = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '-';
    return '$' + Number(value).toFixed(2);
  };

  // 백분율 포맷 함수
  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '-';
    return (Number(value) * 100).toFixed(2) + '%';
  };

  // 비율 포맷 함수
  const formatRatio = (value: number | null | undefined, decimals: number = 2) => {
    if (value === null || value === undefined) return '-';
    return Number(value).toFixed(decimals);
  };

  // 거래량 포맷 함수
  const formatVolume = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '-';
    
    const million = 1000000;
    const thousand = 1000;
    
    const absValue = Math.abs(Number(value));
    
    if (absValue >= million) {
      return (absValue / million).toFixed(1) + 'M';
    } else if (absValue >= thousand) {
      return (absValue / thousand).toFixed(1) + 'K';
    } else {
      return Math.round(absValue).toLocaleString();
    }
  };

  if (!latestIndicator) {
    return (
      <div style={{textAlign: 'center', padding: '20px'}}>
        시장지표 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div style={tableAreaStyle}>
      {/* 가격 정보 */}
      <div style={sectionHeaderStyle}>
        <span>가격 정보</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>현재가</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.current_price)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>전일종가</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.previous_close)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>시가</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.open)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>일일 최고가</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.day_high)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>일일 최저가</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.day_low)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>52주 최고가</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.fifty_two_week_high)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>52주 최저가</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.fifty_two_week_low)}</span>
      </div>

      {/* 거래 정보 */}
      <div style={sectionHeaderStyle}>
        <span>거래 정보</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>거래량</span>
        <span style={tableValueStyle}>{formatVolume(latestIndicator.volume)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>평균거래량</span>
        <span style={tableValueStyle}>{formatVolume(latestIndicator.average_volume)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>시가총액</span>
        <span style={tableValueStyle}>{formatNumber(latestIndicator.market_cap)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>베타</span>
        <span style={tableValueStyle}>{formatRatio(latestIndicator.beta)}</span>
      </div>

      {/* 투자지표 */}
      <div style={sectionHeaderStyle}>
        <span>투자지표</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>PER (후행)</span>
        <span style={tableValueStyle}>{formatRatio(latestIndicator.pe_ratio_trailing)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>PER (선행)</span>
        <span style={tableValueStyle}>{formatRatio(latestIndicator.pe_ratio_forward)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>PBR</span>
        <span style={tableValueStyle}>{formatRatio(latestIndicator.pbr)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>EPS (현재)</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.eps_current_year)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>EPS (예상)</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.eps_forward)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>BPS</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.book_value)}</span>
      </div>

      {/* 배당 정보 */}
      <div style={sectionHeaderStyle}>
        <span>배당 정보</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>배당수익률</span>
        <span style={tableValueStyle}>{formatPercentage(latestIndicator.dividend_yield)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>배당금</span>
        <span style={tableValueStyle}>{formatPrice(latestIndicator.dividend_rate)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>배당성향</span>
        <span style={tableValueStyle}>{formatPercentage(latestIndicator.payout_ratio)}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>배당일</span>
        <span style={tableValueStyle}>{latestIndicator.dividend_date || '-'}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>제외배당일</span>
        <span style={tableValueStyle}>{latestIndicator.ex_dividend_date || '-'}</span>
      </div>

      {/* 성장률 */}
      <div style={sectionHeaderStyle}>
        <span>성장률</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>52주 변화율</span>
        <span style={tableValueStyle}>{formatPercentage(latestIndicator.fifty_two_week_change_percent)}</span>
      </div>

      {/* 거래소 정보 */}
      <div style={sectionHeaderStyle}>
        <span>거래소 정보</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>거래소</span>
        <span style={tableValueStyle}>{latestIndicator.exchange || '-'}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>시장</span>
        <span style={tableValueStyle}>{latestIndicator.market || '-'}</span>
      </div>
      <div style={tableRowStyle}>
        <span style={tableLabelStyle}>통화</span>
        <span style={tableValueStyle}>{latestIndicator.currency || '-'}</span>
      </div>
    </div>
  );
};

export default MarketIndicatorTab; 