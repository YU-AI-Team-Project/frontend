import React from "react";

interface MarketInfoProps {
  activeSubTab: string;
  setSubTab: (tab: string) => void;
}

const MarketInfo: React.FC<MarketInfoProps> = ({ activeSubTab, setSubTab }) => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', gap: '0', marginBottom: '16px', borderBottom: '2px solid #e0e0e0' }}>
        <button className={`sub-tab ${activeSubTab === 'summary' ? 'active' : ''}`} onClick={() => setSubTab('summary')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'summary' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'summary' ? 'bold' : 'normal' }}>시장요약</button>
        <button className={`sub-tab ${activeSubTab === 'featured' ? 'active' : ''}`} onClick={() => setSubTab('featured')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'featured' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'featured' ? 'bold' : 'normal' }}>특징종목</button>
        <button className={`sub-tab ${activeSubTab === 'indicators' ? 'active' : ''}`} onClick={() => setSubTab('indicators')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'indicators' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'indicators' ? 'bold' : 'normal' }}>시장지표</button>
        <button className={`sub-tab ${activeSubTab === 'issues' ? 'active' : ''}`} onClick={() => setSubTab('issues')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'issues' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'issues' ? 'bold' : 'normal' }}>시장이슈</button>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>{activeSubTab === 'summary' ? '시장요약' : activeSubTab === 'featured' ? '특징종목' : activeSubTab === 'indicators' ? '시장지표' : '시장이슈'}</h2>
        <p>이곳에 {activeSubTab} 내용이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default MarketInfo;