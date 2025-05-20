import React from "react";

interface TradingProps {
  activeSubTab: string;
  setSubTab: (tab: string) => void;
}

const Trading: React.FC<TradingProps> = ({ activeSubTab, setSubTab }) => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', gap: '0', marginBottom: '16px', borderBottom: '2px solid #e0e0e0' }}>
        <button className={`sub-tab ${activeSubTab === 'order' ? 'active' : ''}`} onClick={() => setSubTab('order')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'order' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'order' ? 'bold' : 'normal' }}>주식주문</button>
        <button className={`sub-tab ${activeSubTab === 'status' ? 'active' : ''}`} onClick={() => setSubTab('status')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'status' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'status' ? 'bold' : 'normal' }}>투자현황</button>
        <button className={`sub-tab ${activeSubTab === 'backtest' ? 'active' : ''}`} onClick={() => setSubTab('backtest')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'backtest' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'backtest' ? 'bold' : 'normal' }}>백테스팅</button>
        <button className={`sub-tab ${activeSubTab === 'chartgame' ? 'active' : ''}`} onClick={() => setSubTab('chartgame')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'chartgame' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'chartgame' ? 'bold' : 'normal' }}>차트게임</button>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{activeSubTab === 'order' ? '주식주문' : activeSubTab === 'status' ? '투자현황' : activeSubTab === 'backtest' ? '백테스팅' : '차트게임'}</h2>
        <p style={{ color: '#333', marginTop: '8px' }}>이곳에 {activeSubTab} 내용이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default Trading;
