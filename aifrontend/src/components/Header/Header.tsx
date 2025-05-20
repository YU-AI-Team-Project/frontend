import React from 'react';

interface HeaderProps {
  // Define props if any
}

const Header: React.FC<HeaderProps> = () => {
  // Style from Figma: 'Header' (5:4) has fills: fill_YIS6OE ('#FFFFFF')
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '10px 20px', // Basic padding, can be adjusted
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E0E0E0', // A light border to distinguish from content
  };

  // Style from Figma: 'AlphaSquare Logo' (5:8) textStyle: style_CMFS79
  const logoStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '18px',
    // color: '#000000' // fill_I931BD - default black, often not needed to specify
  };

  // Style from Figma: 'Plan Discount' (5:9) textStyle: style_BBQ3HB
  const planDiscountStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    marginLeft: '15px', // Spacing from logo
  };

  // Style from Figma: 'Search Bar' (5:10) has fills: fill_9FOGMN ('#F2F2F2')
  const searchBarStyle: React.CSSProperties = {
    backgroundColor: '#F2F2F2',
    padding: '8px 12px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1, // Allow search bar to take available space
    margin: '0 20px',
  };

  // Style from Figma: 'Search Placeholder' (5:11) textStyle: style_BBQ3HB
  const searchPlaceholderStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    color: '#000000', // fill_I931BD
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
  };

  // Style for Icons (5:12 - 5:16), fills: fill_SSJY87 ('#CCCCCC')
  const iconStyle: React.CSSProperties = {
    width: '24px', // Placeholder size
    height: '24px', // Placeholder size
    backgroundColor: '#CCCCCC',
    borderRadius: '4px',
    marginLeft: '10px',
  };

  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={logoStyle}>알파스퀘어</div>
        <div style={planDiscountStyle}>플랜20%할인</div>
      </div>
      <div style={searchBarStyle}>
        <input type="text" placeholder="Q 종목 검색 (Alt + s)" style={searchPlaceholderStyle} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={iconStyle} title="Icon 1"></div>
        <div style={iconStyle} title="Icon 2"></div>
        <div style={iconStyle} title="Icon 3"></div>
        <div style={iconStyle} title="Icon 4"></div>
        <div style={iconStyle} title="Icon 5"></div>
      </div>
    </header>
  );
};

export default Header; 