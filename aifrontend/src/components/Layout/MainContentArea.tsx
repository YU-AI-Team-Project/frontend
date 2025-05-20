import React from 'react';

import { StockSidebar, RightSidebar } from '../Sidebar';
import CentralArea from './CentralArea';

interface MainContentAreaProps {
  // Define props if any
}

const MainContentArea: React.FC<MainContentAreaProps> = () => {
  // Style from Figma: 'Main Content Area' (5:3) has fills: fill_LOQCMG ('#E6E6E6')
  const mainContentStyle: React.CSSProperties = {
    backgroundColor: '#E6E6E6',
    flexGrow: 1, // Take up remaining vertical space
    display: 'flex',
    flexDirection: 'row', // Align children (sidebars, central area) horizontally
    padding: '0px', // Figma shows no padding for this container itself, children have padding
    // The children components (sidebars, central area) will manage their own internal padding and margins if needed.
  };

  return (
    <main style={mainContentStyle}>
      <StockSidebar />
      <CentralArea />
      <RightSidebar />
    </main>
  );
};

export default MainContentArea; 