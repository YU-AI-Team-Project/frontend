import React, { useState } from 'react';

interface RightSidebarProps {
  // Define props if any
}

const RightSidebar: React.FC<RightSidebarProps> = () => {
  const [activeMainTab, setActiveMainTab] = useState('종목정보');
  const [activeInnerTab, setActiveInnerTab] = useState('재무');
  const [activeTimeframe, setActiveTimeframe] = useState('연간');

  // Style from Figma: 'Right Sidebar' (5:7) has fills: fill_3X181O ('#F7F7F7')
  const sidebarStyle: React.CSSProperties = {
    backgroundColor: '#F7F7F7',
    padding: '15px',
    width: '320px', // Approximate width, can be adjusted
    display: 'flex',
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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
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
    marginBottom: '5px',
    color: '#555',
  };

  const tableRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400, // style_EF0PF4
    fontSize: '12px',
    marginBottom: '8px',
  };
  
  const tableLabelStyle: React.CSSProperties = {
    flexBasis: '30%',
  };

  const tableValuesStyle: React.CSSProperties = {
    flexBasis: '70%',
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const mainTabs = ['종목정보'];
  const innerTabs = ['요약', '재무', '이슈'];
  const timeframes = ['분기', '연간'];

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
            <div style={stockTitleStyle}>가온칩스</div>
            
            <div style={innerTabBarContainerStyle}>
              {innerTabs.map(tab => (
                <div key={tab} style={getInnerTabStyle(activeInnerTab === tab)} onClick={() => setActiveInnerTab(tab)}>
                  {tab}
                </div>
              ))}
            </div>

            {activeInnerTab === '재무' && (
              <>
                <div style={timeFrameButtonsContainerStyle}>
                  {timeframes.map(tf => (
                    <button key={tf} style={getTimeFrameButtonStyle(activeTimeframe === tf)} onClick={() => setActiveTimeframe(tf)}>
                      {tf}
                    </button>
                  ))}
                  <a href="#" style={{...detailsLinkStyle, marginLeft: 'auto'}}>재무 상세 보기 ↗</a>
                </div>
                
                <div style={tableAreaStyle}>
                    <div style={tableHeaderStyle}>
                        <span></span> {/* Empty for label column header */}
                        <div style={tableValuesStyle}>
                            <span>2020/12</span>
                            <span>2022/12</span>
                            <span>2023/12</span>
                            <span>2024/12</span>
                        </div>
                    </div>
                    <div style={tableRowStyle}>
                        <span style={tableLabelStyle}>매출액(억)</span>
                        <div style={tableValuesStyle}>
                            <span>171</span>
                            <span>433</span>
                            <span>636</span>
                            <span>965</span>
                        </div>
                    </div>
                    <div style={tableRowStyle}>
                        <span style={tableLabelStyle}>영업이익(억)</span>
                        <div style={tableValuesStyle}>
                           <span>20</span>
                           <span>39</span>
                           <span>44</span>
                           <span>35</span>
                        </div>
                    </div>
                    {/* Add more rows as needed */}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar; 