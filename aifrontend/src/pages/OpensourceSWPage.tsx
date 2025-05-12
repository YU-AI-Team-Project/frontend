import React from 'react';

import Header from '../components/Header';
import MainContentArea from '../components/Layout/MainContentArea';
import BottomLeftAdBanner from '../components/Banners/BottomLeftAdBanner';

interface OpensourceSWPageProps {
  // Define props if any, for now, it's empty
}

const OpensourceSWPage: React.FC<OpensourceSWPageProps> = () => {
  // Style from Figma: 'Overall Page' (5:2) has fills: fill_MP4YOM ('#F5F5F5')
  const pageStyle: React.CSSProperties = {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh', // Ensure it takes full viewport height
    display: 'flex',
    flexDirection: 'column', // Stack Header, Main Content, Ad Banner vertically
  };

  return (
    <div style={pageStyle}>
      <Header />
      <MainContentArea />
      <BottomLeftAdBanner />
    </div>
  );
};

export default OpensourceSWPage; 