import React, { useState, useEffect } from 'react';
import { useStock } from '../../context/StockContext';
import { FinancialStatement, StockDetailResponse } from '../../api/types';
import MarketIndicatorTab from './MarketIndicatorTab';

interface RightSidebarProps {
  // Define props if any
  isOpen?: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen = false }) => {
  const { stockData, isLoading, error, newsData } = useStock();
  const [activeMainTab, setActiveMainTab] = useState('종목정보');
  const [activeInnerTab, setActiveInnerTab] = useState('재무');
  const [activeTimeframe, setActiveTimeframe] = useState('연간');

  // Mock 데이터 추가 (테스트용)
  const mockFinancialStatements: FinancialStatement[] = [
    {
      report_period: '2024-09',
      report_type: 'annual',
      revenue: 391035000000,
      operating_income: 123216000000,
      net_income: 93736000000,
      assets: 364980000000,
      liabilities: 120000000000,
      equity: 244980000000,
      gross_profits: 171272000000,
      ebitda: 131500000000,
      operating_cashflow: 110543000000,
      free_cashflow: 99584000000,
      revenue_per_share: 25.12,
      gross_margins: 0.43800,
      ebitda_margins: 0.33640,
      operating_margins: 0.31510,
      return_on_assets: 0.25690,
      return_on_equity: 0.38270,
      debt_to_equity: 2.090,
      quick_ratio: 1.100,
      current_ratio: 1.290,
      earnings_growth: 0.13560,
      revenue_growth: 0.02020,
      enterprise_value: 3400000000000,
      enterprise_to_revenue: 8.70,
      enterprise_to_ebitda: 25.86
    },
    {
      report_period: '2023-09',
      report_type: 'annual',
      revenue: 383285000000,
      operating_income: 114301000000,
      net_income: 96995000000,
      assets: 352755000000,
      liabilities: 110000000000,
      equity: 242755000000,
      gross_profits: 169148000000,
      ebitda: 123136000000,
      operating_cashflow: 110543000000,
      free_cashflow: 99584000000,
      revenue_per_share: 24.32,
      gross_margins: 0.44132,
      ebitda_margins: 0.32108,
      operating_margins: 0.29830,
      return_on_assets: 0.27502,
      return_on_equity: 0.39958,
      debt_to_equity: 1.930,
      quick_ratio: 1.050,
      current_ratio: 1.260,
      earnings_growth: 0.02660,
      revenue_growth: -0.02780,
      enterprise_value: 3200000000000,
      enterprise_to_revenue: 8.35,
      enterprise_to_ebitda: 26.00
    },
    {
      report_period: '2022-09',
      report_type: 'annual',
      revenue: 394328000000,
      operating_income: 119437000000,
      net_income: 99803000000,
      assets: 351002000000,
      liabilities: 108000000000,
      equity: 243002000000,
      gross_profits: 170782000000,
      ebitda: 130541000000,
      operating_cashflow: 122151000000,
      free_cashflow: 111443000000,
      revenue_per_share: 24.31,
      gross_margins: 0.43314,
      ebitda_margins: 0.33099,
      operating_margins: 0.30289,
      return_on_assets: 0.28432,
      return_on_equity: 0.41066,
      debt_to_equity: 1.950,
      quick_ratio: 1.120,
      current_ratio: 1.340,
      earnings_growth: 0.05410,
      revenue_growth: 0.07794,
      enterprise_value: 3100000000000,
      enterprise_to_revenue: 7.86,
      enterprise_to_ebitda: 23.74
    },
    {
      report_period: '2021-09',
      report_type: 'annual',
      revenue: 365817000000,
      operating_income: 108949000000,
      net_income: 94680000000,
      assets: 323888000000,
      liabilities: 98000000000,
      equity: 225888000000,
      gross_profits: 152836000000,
      ebitda: 120233000000,
      operating_cashflow: 104038000000,
      free_cashflow: 92953000000,
      revenue_per_share: 22.84,
      gross_margins: 0.41782,
      ebitda_margins: 0.32864,
      operating_margins: 0.29782,
      return_on_assets: 0.29233,
      return_on_equity: 0.41912,
      debt_to_equity: 1.860,
      quick_ratio: 1.070,
      current_ratio: 1.270,
      earnings_growth: 0.64920,
      revenue_growth: 0.33260,
      enterprise_value: 2900000000000,
      enterprise_to_revenue: 7.93,
      enterprise_to_ebitda: 24.12
    },
    {
      report_period: '2024-12',
      report_type: 'quarterly',
      revenue: 124300000000,
      operating_income: 42832000000,
      net_income: 36330000000,
      assets: 344085000000,
      liabilities: 105000000000,
      equity: 239085000000,
      gross_profits: 56270000000,
      ebitda: 45800000000,
      operating_cashflow: 38100000000,
      free_cashflow: 34500000000,
      revenue_per_share: 7.99,
      gross_margins: 0.45260,
      ebitda_margins: 0.36850,
      operating_margins: 0.34470,
      return_on_assets: 0.10560,
      return_on_equity: 0.15200,
      debt_to_equity: 0.440,
      quick_ratio: 1.150,
      current_ratio: 1.320,
      earnings_growth: 0.35680,
      revenue_growth: 0.06540,
      enterprise_value: 3500000000000,
      enterprise_to_revenue: 8.95,
      enterprise_to_ebitda: 24.30
    },
    {
      report_period: '2024-09',
      report_type: 'quarterly',
      revenue: 94930000000,
      operating_income: 29591000000,
      net_income: 14736000000,
      assets: 364980000000,
      liabilities: 120000000000,
      equity: 244980000000,
      gross_profits: 42830000000,
      ebitda: 32100000000,
      operating_cashflow: 25600000000,
      free_cashflow: 22100000000,
      revenue_per_share: 6.10,
      gross_margins: 0.45120,
      ebitda_margins: 0.33820,
      operating_margins: 0.31170,
      return_on_assets: 0.04040,
      return_on_equity: 0.06010,
      debt_to_equity: 0.490,
      quick_ratio: 1.080,
      current_ratio: 1.280,
      earnings_growth: -0.35980,
      revenue_growth: -0.06110,
      enterprise_value: 3450000000000,
      enterprise_to_revenue: 9.12,
      enterprise_to_ebitda: 26.95
    },
    {
      report_period: '2024-06',
      report_type: 'quarterly',
      revenue: 85777000000,
      operating_income: 25352000000,
      net_income: 21448000000,
      assets: 331612000000,
      liabilities: 98000000000,
      equity: 233612000000,
      gross_profits: 38670000000,
      ebitda: 27500000000,
      operating_cashflow: 26000000000,
      free_cashflow: 23200000000,
      revenue_per_share: 5.51,
      gross_margins: 0.45080,
      ebitda_margins: 0.32070,
      operating_margins: 0.29560,
      return_on_assets: 0.06470,
      return_on_equity: 0.09180,
      debt_to_equity: 0.420,
      quick_ratio: 1.090,
      current_ratio: 1.300,
      earnings_growth: 0.05200,
      revenue_growth: 0.04870,
      enterprise_value: 3300000000000,
      enterprise_to_revenue: 8.85,
      enterprise_to_ebitda: 27.60
    },
    {
      report_period: '2024-03',
      report_type: 'quarterly',
      revenue: 90753000000,
      operating_income: 27900000000,
      net_income: 23636000000,
      assets: 337411000000,
      liabilities: 101000000000,
      equity: 236411000000,
      gross_profits: 41020000000,
      ebitda: 30100000000,
      operating_cashflow: 28500000000,
      free_cashflow: 25800000000,
      revenue_per_share: 5.83,
      gross_margins: 0.45210,
      ebitda_margins: 0.33170,
      operating_margins: 0.30740,
      return_on_assets: 0.07010,
      return_on_equity: 0.10000,
      debt_to_equity: 0.430,
      quick_ratio: 1.100,
      current_ratio: 1.310,
      earnings_growth: 0.16380,
      revenue_growth: 0.04530,
      enterprise_value: 3250000000000,
      enterprise_to_revenue: 8.70,
      enterprise_to_ebitda: 26.22
    }
  ];

  const mockStockData = {
    stock: {
      code: 'AAPL',
      company_name: 'Apple Inc.',
      financial_info: 'Test financial info',
      report_url: '#'
    },
    financial_statements: mockFinancialStatements,
    market_indicators: [],
    earnings_forecasts: []
  };

  // 실제 데이터가 있으면 사용하고, 없으면 mock 데이터 사용
  const displayData = stockData || mockStockData;
  const hasRealData = !!stockData;

  // Style from Figma: 'Right Sidebar' (5:7) has fills: fill_3X181O ('#F7F7F7')
  const sidebarStyle: React.CSSProperties = {
    backgroundColor: '#F7F7F7',
    padding: '15px',
    width: '360px', // Fixed width
    minWidth: '360px', // Ensure minimum width
    maxWidth: '360px', // Ensure maximum width
    display: isOpen || !!displayData ? 'flex' : 'none',
    flexDirection: 'column',
    borderLeft: '1px solid #E0E0E0',
  };

  // Style for Tab Bar (5:54), fills: fill_YIS6OE ('#FFFFFF')
  const tabBarContainerStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    padding: '5px',
    marginBottom: '15px',
  };

  const getTabStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: 'Inter, sans-serif',
    fontWeight: isActive ? 700 : 400, // style_SGVVDB for active, style_BBQ3HB for inactive
    fontSize: '14px',
    padding: '8px 12px',
    cursor: 'pointer',
    textAlign: 'center',
    flexGrow: 1,
    borderBottom: isActive ? '2px solid #4D99CC' : '2px solid transparent',
    color: '#000000', // fill_I931BD
  });

  // Style for Content Area (5:59), fills: fill_YIS6OE ('#FFFFFF')
  const contentAreaStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '15px',
    borderRadius: '4px',
    height: 'calc(100vh - 120px)', // 고정 높이 설정
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // 전체 영역은 스크롤 없음
  };

  // Style from Figma: 'RSB Stock Title' (5:60) textStyle: style_32ZW5Y
  const stockTitleStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    marginBottom: '5px',
  };

  // Style from Figma: 'RSB Stock Tag' (5:61) textStyle: style_EF0PF4
  const stockTagStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    backgroundColor: '#E0E0E0', // A generic background for tag
    padding: '2px 6px',
    borderRadius: '3px',
    display: 'inline-block',
    marginBottom: '10px',
  };

  // Style from Figma: 'RSB Strategy Button' (5:62) fills: fill_9FOGMN ('#F2F2F2')
  // textStyle: style_BBQ3HB
  const strategyButtonStyle: React.CSSProperties = {
    backgroundColor: '#F2F2F2',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '15px',
  };

  const innerTabBarContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginBottom: '15px',
    borderBottom: '1px solid #EEE',
  };

  const getInnerTabStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: 'Inter, sans-serif',
    fontWeight: isActive ? 700 : 400, // style_SGVVDB for active (재무), style_BBQ3HB for inactive
    fontSize: '14px',
    padding: '8px 10px',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #007bff' : '2px solid transparent',
    color: isActive ? '#007bff' : '#000000',
    marginRight: '10px',
  });

  const timeFrameButtonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginBottom: '10px',
  };

  const getTimeFrameButtonStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400, // style_BBQ3HB
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    // 분기 (5:68) fills: fill_LOQCMG ('#E6E6E6')
    // 연간 (5:70) fills: fill_RH71WZ ('#4D4D4D')
    backgroundColor: isActive ? '#4D4D4D' : '#E6E6E6',
    color: isActive ? '#FFFFFF' : '#000000',
    border: 'none',
    marginRight: '5px',
  });

  // Style from Figma: 'RSB Financial Details Link' (5:72) textStyle: style_EF0PF4
  const detailsLinkStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    color: '#007bff',
    textDecoration: 'none',
    marginBottom: '15px',
    textAlign: 'right',
  };

  // Style from Figma: 'Financial Table Area' (5:73) fills: fill_YIS6OE ('#FFFFFF')
  const tableAreaStyle: React.CSSProperties = {
    // backgroundColor: '#FFFFFF', // Already on contentAreaStyle
    flexGrow: 1,
  };

  const tableHeaderStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400, // style_CQA1DW
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    color: '#555',
    borderBottom: '1px solid #eee',
    paddingBottom: '5px',
  };

  const tableRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400, // style_EF0PF4
    fontSize: '12px',
    marginBottom: '8px',
    padding: '4px 0',
    borderBottom: '1px solid #f5f5f5',
  };
  
  const tableLabelStyle: React.CSSProperties = {
    flexBasis: '40%',
    fontWeight: 500,
  };

  const tableValuesStyle: React.CSSProperties = {
    flexBasis: '60%',
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const valueItemStyle: React.CSSProperties = {
    width: '60px',
    textAlign: 'right',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  };

  const mainTabs = ['종목정보'];
  const innerTabs = ['재무', '시장지표', '관련뉴스'];
  const timeframes = ['분기', '연간'];

  useEffect(() => {
    // 재무제표 데이터가 있는지 디버깅
    if (displayData?.financial_statements) {
      //console.log('재무제표 데이터 (실제:', hasRealData, '):', displayData.financial_statements);
    }
  }, [displayData, hasRealData]);

  // 재무제표 필터링: 분기/연간에 따라
  const filteredFinancials = displayData?.financial_statements
    ? displayData.financial_statements.filter((fs: FinancialStatement) => 
        activeTimeframe === '분기' 
          ? fs.report_type === 'quarterly'
          : fs.report_type === 'annual'
      )
    : [];

  //console.log('필터링된 재무제표:', filteredFinancials);

  // 날짜/기간 정렬
  const sortedFinancials = [...filteredFinancials].sort((a: FinancialStatement, b: FinancialStatement) => {
    // 날짜 문자열을 비교
    if (a.report_period > b.report_period) return -1;
    if (a.report_period < b.report_period) return 1;
    return 0;
  }).slice(0, 4); // 최대 4개만 표시

  //console.log('정렬된 재무제표:', sortedFinancials);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    
    // 연간 데이터는 연도만 표시
    if (activeTimeframe === '연간') {
      return year;
    } 
    // 분기 데이터
    else {
      const quarterMap: {[key: string]: string} = {
        '03': 'Q1',
        '06': 'Q2',
        '09': 'Q3',
        '12': 'Q4'
      };
      return `${year}-${quarterMap[month] || month}`;
    }
  };

  // 숫자 포맷 함수 (null 처리 포함 및 큰 숫자 단위 변환)
  const formatNumber = (value: number | null | undefined) => {
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
      return Math.round(absValue).toLocaleString();
    }
  };

  // 백분율 포맷 함수
  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '-';
    return (Number(value) * 100).toFixed(2) + '%';
  };

  // 비율 포맷 함수
  const formatRatio = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '-';
    return Number(value).toFixed(2);
  };

  // 주당 데이터 포맷 함수
  const formatPerShare = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '-';
    return '$' + Number(value).toFixed(2);
  };

  useEffect(() => {
    // 기본적으로 연간 데이터가 있으면 연간 탭을 활성화
    if (displayData?.financial_statements) {
      const hasAnnualData = displayData.financial_statements.some(
        (fs: FinancialStatement) => fs.report_type === 'annual'
      );
      if (hasAnnualData) {
        setActiveTimeframe('연간');
      }
    }
  }, [displayData]);

  if (isLoading) {
    return (
      <div style={sidebarStyle}>
        <div style={{...contentAreaStyle, justifyContent: 'center', alignItems: 'center'}}>
          데이터를 로딩 중입니다...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={sidebarStyle}>
        <div style={{...contentAreaStyle, color: 'red'}}>
          오류 발생: {error}
        </div>
      </div>
    );
  }

  // Mock 데이터를 사용할 때는 항상 표시하도록 수정
  if (!displayData || (!isOpen && !displayData)) {
    return null;
  }

  return (
    <div style={sidebarStyle}>
      <div style={tabBarContainerStyle}>
        {mainTabs.map(tab => (
          <div key={tab} style={getTabStyle(activeMainTab === tab)} onClick={() => setActiveMainTab(tab)}>
            {tab}
          </div>
        ))}
      </div>

      <div style={contentAreaStyle}>
        {activeMainTab === '종목정보' && (
          <>
            <div style={stockTitleStyle}>{displayData.stock.company_name}</div>
            <div style={stockTagStyle}>{displayData.stock.code}</div>
            
            <div style={innerTabBarContainerStyle}>
              {innerTabs.map(tab => (
                <div key={tab} style={getInnerTabStyle(activeInnerTab === tab)} onClick={() => setActiveInnerTab(tab)}>
                  {tab}
                </div>
              ))}
            </div>

            {activeInnerTab === '재무' && (
              <div style={{
                height: '100%',
                overflow: 'auto',
                paddingRight: '5px'
              }}>
                <div style={timeFrameButtonsContainerStyle}>
                  {timeframes.map(tf => (
                    <button key={tf} style={getTimeFrameButtonStyle(activeTimeframe === tf)} onClick={() => setActiveTimeframe(tf)}>
                      {tf}
                    </button>
                  ))}
                  <a href="#" style={{...detailsLinkStyle, marginLeft: 'auto'}}>재무 상세 보기 ↗</a>
                </div>
                
                {sortedFinancials.length > 0 ? (
                  <div style={tableAreaStyle}>
                    <div style={tableHeaderStyle}>
                      <span style={tableLabelStyle}>항목</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatDate(fs.report_period)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>매출액</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.revenue)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>영업이익</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.operating_income)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>당기순이익</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.net_income)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>자산총계</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.assets)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>부채총계</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.liabilities)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>자본총계</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.equity)}</span>
                        ))}
                      </div>
                    </div>
                    
                    {/* 수익성 지표 섹션 */}
                    <div style={{...tableHeaderStyle, marginTop: '15px', fontWeight: 600, color: '#333'}}>
                      <span>수익성 지표</span>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>총이익</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.gross_profits)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>EBITDA</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.ebitda)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>총이익률</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPercentage(fs.gross_margins)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>EBITDA 마진</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPercentage(fs.ebitda_margins)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>영업이익률</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPercentage(fs.operating_margins)}</span>
                        ))}
                      </div>
                    </div>

                    {/* 현금흐름 섹션 */}
                    <div style={{...tableHeaderStyle, marginTop: '15px', fontWeight: 600, color: '#333'}}>
                      <span>현금흐름</span>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>영업현금흐름</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.operating_cashflow)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>잉여현금흐름</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.free_cashflow)}</span>
                        ))}
                      </div>
                    </div>

                    {/* 재무비율 섹션 */}
                    <div style={{...tableHeaderStyle, marginTop: '15px', fontWeight: 600, color: '#333'}}>
                      <span>재무비율</span>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>ROA</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPercentage(fs.return_on_assets)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>ROE</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPercentage(fs.return_on_equity)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>부채비율</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatRatio(fs.debt_to_equity)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>유동비율</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatRatio(fs.current_ratio)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>당좌비율</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatRatio(fs.quick_ratio)}</span>
                        ))}
                      </div>
                    </div>

                    {/* 성장률 섹션 */}
                    <div style={{...tableHeaderStyle, marginTop: '15px', fontWeight: 600, color: '#333'}}>
                      <span>성장률</span>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>매출성장률</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPercentage(fs.revenue_growth)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>순이익성장률</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPercentage(fs.earnings_growth)}</span>
                        ))}
                      </div>
                    </div>

                    {/* 주당 지표 및 기업가치 섹션 */}
                    <div style={{...tableHeaderStyle, marginTop: '15px', fontWeight: 600, color: '#333'}}>
                      <span>주당지표 & 기업가치</span>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>주당매출</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatPerShare(fs.revenue_per_share)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>기업가치</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatNumber(fs.enterprise_value)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>EV/매출</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatRatio(fs.enterprise_to_revenue)}</span>
                        ))}
                      </div>
                    </div>
                    <div style={tableRowStyle}>
                      <span style={tableLabelStyle}>EV/EBITDA</span>
                      <div style={tableValuesStyle}>
                        {sortedFinancials.map((fs, index) => (
                          <span key={index} style={valueItemStyle}>{formatRatio(fs.enterprise_to_ebitda)}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{textAlign: 'center', padding: '20px'}}>
                    재무 데이터가 없습니다.
                  </div>
                )}
              </div>
            )}
            
            {activeInnerTab === '시장지표' && (
              <MarketIndicatorTab 
                marketIndicators={displayData?.market_indicators || []}
                hasRealData={hasRealData}
              />
            )}

            {activeInnerTab === '관련뉴스' && (
              <div style={{
                height: '100%', 
                overflow: 'auto',
                paddingRight: '5px' // 스크롤바 공간
              }}>
                {newsData.length > 0 ? (
                  <>
                    <div style={{
                      marginBottom: '15px', 
                      fontSize: '14px', 
                      color: '#666',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#FFFFFF',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #EEEEEE'
                    }}>
                      총 {newsData.length}개의 관련 뉴스
                    </div>
                    {newsData.map((news: any, index: number) => (
                      <div key={news.id || index} style={{
                        backgroundColor: '#FAFAFA',
                        padding: '12px',
                        marginBottom: '10px',
                        borderRadius: '6px',
                        border: '1px solid #EEEEEE'
                      }}>
                        <div style={{
                          fontWeight: 600,
                          fontSize: '13px',
                          color: '#333',
                          marginBottom: '6px',
                          lineHeight: '1.4',
                          cursor: 'pointer'
                        }}>
                          {news.title}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#888',
                          marginBottom: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span>{news.published_at || '날짜 미상'}</span>
                          {news.similarity && (
                            <span style={{
                              backgroundColor: '#E3F2FD',
                              color: '#1976D2',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '10px'
                            }}>
                              관련도: {(news.similarity * 100).toFixed(1)}%
                            </span>
                          )}
                        </div>
                        {news.content && (
                          <div style={{
                            fontSize: '12px',
                            color: '#555',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap', // 줄바꿈 유지
                            wordBreak: 'break-word' // 긴 단어 줄바꿈
                          }}>
                            {news.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#888'
                  }}>
                    <div style={{fontSize: '14px', marginBottom: '8px'}}>
                      📰 관련 뉴스가 없습니다
                    </div>
                    <div style={{fontSize: '12px'}}>
                      채팅에서 질문하시면 관련 뉴스를 확인할 수 있습니다
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar; 