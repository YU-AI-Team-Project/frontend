import React from 'react';

interface StockItemProps {
  logoColor?: string;
  name: string;
  code: string;
  price: string;
  change: string;
}

const StockItem: React.FC<StockItemProps> = ({
  logoColor = '#4D99CC', // Default logo color from 'Stock Logo HD' (5:22) -> fill_KC4XD1
  name,
  code,
  price,
  change,
}) => {
  // Style from Figma: 'Stock Item 1' (5:21) has fills: fill_YIS6OE ('#FFFFFF')
  const itemStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #EEE',
  };

  const logoStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    backgroundColor: logoColor,
    borderRadius: '4px',
    marginRight: '10px',
    // In a real app, this would be an <img> or an icon component
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
  };

  const infoStyle: React.CSSProperties = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  // Style from Figma: 'Stock Name HD' (5:23) textStyle: style_TUE4LM
  const nameStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '13px',
    color: '#000000', // fill_I931BD
  };

  // Style from Figma: 'Stock Code HD' (5:24) textStyle: style_CQA1DW
  const codeStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '11px',
    color: '#000000', // fill_I931BD
  };

  const financialsStyle: React.CSSProperties = {
    textAlign: 'right',
  };

  // Style from Figma: 'Stock Price HD' (5:25) textStyle: style_SGVVDB
  const priceStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '14px',
    color: '#000000', // fill_I931BD
  };

  // Style from Figma: 'Stock Change HD' (5:26) textStyle: style_EF0PF4
  const changeStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    color: change.startsWith('-') ? 'blue' : 'red', // Example: blue for negative, red for positive
  };

  return (
    <div style={itemStyle}>
      <div style={logoStyle}>{name.substring(0, 2).toUpperCase()}</div> {/* Simple text logo placeholder */}
      <div style={infoStyle}>
        <span style={nameStyle}>{name}</span>
        <span style={codeStyle}>{code}</span>
      </div>
      <div style={financialsStyle}>
        <div style={priceStyle}>{price}</div>
        <div style={changeStyle}>{change}</div>
      </div>
    </div>
  );
};

export default StockItem; 