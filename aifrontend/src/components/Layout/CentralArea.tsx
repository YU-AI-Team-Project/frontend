import React from 'react';

interface CentralAreaProps {
  // Define props if any
}

const CentralArea: React.FC<CentralAreaProps> = () => {
  // Style from Figma: 'Central Area' (5:6) has fills: fill_65VSU5 ('#F0F0F0')
  const areaStyle: React.CSSProperties = {
    backgroundColor: '#F0F0F0',
    flexGrow: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 10px', // Matches placeholder style from MainContentArea
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const stockInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
  };

  // Style from Figma: 'Stock Name Gaonchips' (5:34) textStyle: style_CUGCUA
  const stockNameStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '24px',
    marginRight: '10px',
  };

  // Style from Figma: 'Price Gaonchips' (5:35) textStyle: style_D6B4P4
  const priceStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '20px',
    marginRight: '10px',
  };

  // Style from Figma: 'Change Gaonchips' (5:36) textStyle: style_BBQ3HB
  const changeStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    color: 'blue', // Assuming negative change based on text
  };

  // Style from Figma: 'Volume Info Simplified' (5:37) textStyle: style_EF0PF4
  const volumeInfoStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    marginTop: '5px',
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  // Style from Figma: Buttons (5:38, 5:40) have fills: fill_BDUQOE ('#D9D9D9')
  // textStyle: style_BBQ3HB
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#D9D9D9',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  // Style for Central Header Icons (5:42, 5:43), fills: fill_SSJY87 ('#CCCCCC')
  const headerIconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    backgroundColor: '#CCCCCC',
    borderRadius: '4px',
    marginLeft: '10px',
  };

  // Style from Figma: 'Chart Controls SubHeader' (5:44) fills: fill_S05J8S ('#EBEBEB')
  // textStyle: style_BBQ3HB
  const subHeaderStyle: React.CSSProperties = {
    backgroundColor: '#EBEBEB',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    marginBottom: '10px',
    borderRadius: '4px',
  };

  // Style for Chart Areas (5:47, 5:49), fills: fill_YIS6OE ('#FFFFFF')
  const chartAreaStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    marginBottom: '10px',
    padding: '20px',
  };

  // Style from Figma: 'Chart Placeholder Text' (5:48) textStyle: style_OR7DZ3
  const mainChartTextStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '48px',
  };

  // Style from Figma: 'Volume Chart Placeholder' (5:50) textStyle: style_S85B4T
  const volumeChartTextStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '24px',
  };

  // Style from Figma: 'Central Bottom Bar' (5:51) fills: fill_9FOGMN ('#F2F2F2')
  // textStyle: style_BBQ3HB
  const bottomBarStyle: React.CSSProperties = {
    backgroundColor: '#F2F2F2',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    borderRadius: '4px',
    marginTop: 'auto', // Push to bottom
  };

  return (
    <div style={areaStyle}>
      <div style={headerStyle}>
        <div>
          <div style={stockInfoStyle}>
            <span style={stockNameStyle}>가온칩스</span>
            <span style={priceStyle}>42,300</span>
            <span style={changeStyle}>-2.08% ▼900</span>
          </div>
          <div style={volumeInfoStyle}>거래량/거래대금 정보</div>
        </div>
        <div style={actionsStyle}>
          <button style={buttonStyle}>매도</button>
          <button style={buttonStyle}>매수</button>
          <div style={headerIconStyle} title="Central Header Icon 1"></div>
          <div style={headerIconStyle} title="Central Header Icon 2"></div>
        </div>
      </div>

      <div style={subHeaderStyle}>
        <span>지표  전략  비교  분석  예측</span>
        <span>3분  15분  일  주  월  ⚙️</span>
      </div>

      <div style={{...chartAreaStyle, minHeight: '300px' /* Example height */}}>
        <span style={mainChartTextStyle}>[Chart Area]</span>
      </div>

      <div style={{...chartAreaStyle, minHeight: '100px' /* Example height */}}>
        <span style={volumeChartTextStyle}>[Volume Chart]</span>
      </div>

      <div style={bottomBarStyle}>
        <span>알파스퀘어 | 거래량 14만 2,727 (-5.25%)</span>
        <span>국내증시 코스피 ... 해외증시 다우 ...</span>
      </div>
    </div>
  );
};

export default CentralArea; 