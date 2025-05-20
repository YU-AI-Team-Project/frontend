import React from "react";

interface StockAnalysisProps {
  activeSubTab: string;
  setSubTab: (tab: string) => void;
}

const StockAnalysis: React.FC<StockAnalysisProps> = ({ activeSubTab, setSubTab }) => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', gap: '0', marginBottom: '16px', borderBottom: '2px solid #e0e0e0' }}>
        <button className={`sub-tab ${activeSubTab === 'info' ? 'active' : ''}`} onClick={() => setSubTab('info')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'info' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'info' ? 'bold' : 'normal' }}>종목정보</button>
        <button className={`sub-tab ${activeSubTab === 'indicator' ? 'active' : ''}`} onClick={() => setSubTab('indicator')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'indicator' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'indicator' ? 'bold' : 'normal' }}>지표분석</button>
        <button className={`sub-tab ${activeSubTab === 'ai' ? 'active' : ''}`} onClick={() => setSubTab('ai')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'ai' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'ai' ? 'bold' : 'normal' }}>AI예측</button>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>{activeSubTab === 'info' ? '종목정보' : activeSubTab === 'indicator' ? '지표분석' : 'AI예측'}</h2>
        <p>이곳에 {activeSubTab} 내용이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default StockAnalysis;