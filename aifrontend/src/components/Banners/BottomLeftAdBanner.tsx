import React from 'react';

interface BottomLeftAdBannerProps {
  // Define props if any
}

const BottomLeftAdBanner: React.FC<BottomLeftAdBannerProps> = () => {
  // Style from Figma: 'Bottom Left Ad Banner' (5:79) has fills: fill_LOQCMG ('#E6E6E6')
  const bannerStyle: React.CSSProperties = {
    backgroundColor: '#E6E6E6',
    padding: '10px 20px',
    textAlign: 'center',
    borderTop: '1px solid #D0D0D0', // A slightly darker border to separate from main content
  };

  // Style from Figma: 'Ad Banner Text' (5:80) textStyle: style_BBQ3HB
  const textStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    color: '#000000', // fill_I931BD
  };

  return (
    <div style={bannerStyle}>
      <p style={textStyle}>[AD BANNER]</p>
    </div>
  );
};

export default BottomLeftAdBanner; 