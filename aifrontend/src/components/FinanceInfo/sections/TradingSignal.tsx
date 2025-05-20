import React from "react";

interface TradingSignalProps {
  activeSubTab: string;
  setSubTab: (tab: string) => void;
}

const TradingSignal: React.FC<TradingSignalProps> = ({ activeSubTab, setSubTab }) => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', gap: '0', marginBottom: '16px', borderBottom: '2px solid #e0e0e0' }}>
        <button className={`sub-tab ${activeSubTab === 'signal' ? 'active' : ''}`} onClick={() => setSubTab('signal')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'signal' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'signal' ? 'bold' : 'normal' }}>매매신호</button>
        <button className={`sub-tab ${activeSubTab === 'theme' ? 'active' : ''}`} onClick={() => setSubTab('theme')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'theme' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'theme' ? 'bold' : 'normal' }}>테마종목</button>
        <button className={`sub-tab ${activeSubTab === 'filter' ? 'active' : ''}`} onClick={() => setSubTab('filter')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'filter' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'filter' ? 'bold' : 'normal' }}>종목필터</button>
        <button className={`sub-tab ${activeSubTab === 'chart' ? 'active' : ''}`} onClick={() => setSubTab('chart')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'chart' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'chart' ? 'bold' : 'normal' }}>유사차트</button>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{activeSubTab === 'signal' ? '매매신호' : activeSubTab === 'theme' ? '테마종목' : activeSubTab === 'filter' ? '종목필터' : '유사차트'}</h2>
        <p style={{ color: '#333', marginTop: '8px' }}>이곳에 {activeSubTab} 내용이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default TradingSignal;
