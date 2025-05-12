import React from 'react';
import StockItem from '../Stock'; // Updated import path for StockItem

interface LeftSidebarProps {
  // Define props if any
}

const LeftSidebar: React.FC<LeftSidebarProps> = () => {
  // Style from Figma: 'Left Sidebar' (5:5) has fills: fill_QRKQDI ('#FAFAFA')
  const sidebarStyle: React.CSSProperties = {
    backgroundColor: '#FAFAFA',
    padding: '15px',
    width: '280px', // Approximate width, can be adjusted
    minHeight: 'calc(100vh - 140px)', // Example: viewport height minus header and ad banner height
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #E0E0E0',
  };

  // Style from Figma: 'Sidebar Title' (5:17) textStyle: style_L62EQC
  const titleStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '16px',
    marginBottom: '20px',
    color: '#000000', // fill_I931BD
  };

  // Style from Figma: 'Add Stock' (5:18) textStyle: style_BBQ3HB
  const addStockStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    marginBottom: '15px',
    cursor: 'pointer',
    color: '#000000', // fill_I931BD
  };

  // Style for Sidebar Icons (5:19, 5:20), fills: fill_SSJY87 ('#CCCCCC')
  const iconStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    backgroundColor: '#CCCCCC',
    borderRadius: '3px',
    marginBottom: '10px',
  };

  const stockItemsContainerStyle: React.CSSProperties = {
    marginTop: '15px',
  };

  // Stock data from Figma
  const stocks = [
    {
      name: 'HD현대일렉트릭', // (5:23)
      code: '267260', // (5:24)
      price: '334,500', // (5:25)
      change: '-2.48%', // (5:26)
      // logoColor: '#4D99CC' // fill_KC4XD1 for (5:22) - Handled by StockItem default
    },
    {
      name: 'HD현대건설기계', // (5:30)
      code: '267270', // (5:31)
      price: '69,600', // (5:32)
      change: '-0.14%', // (5:33)
      // logoColor: '#4D99CC' // fill_KC4XD1 for (5:29) - Handled by StockItem default
    },
    // Stock Item 3 (5:28) in Figma does not have detailed text children, so using placeholder data
    {
      name: '알파스퀘어홀딩스',
      code: '000000',
      price: '10,000',
      change: '+1.23%',
    },
  ];

  return (
    <div style={sidebarStyle}>
      <div style={titleStyle}>≡ 분석</div>
      <div style={addStockStyle}>+ 종목추가</div>
      <div style={iconStyle} title="Sidebar Icon 1"></div>
      <div style={iconStyle} title="Sidebar Icon 2"></div>

      <div style={stockItemsContainerStyle}>
        {stocks.map((stock, index) => (
          <StockItem
            key={index}
            name={stock.name}
            code={stock.code}
            price={stock.price}
            change={stock.change}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar; 