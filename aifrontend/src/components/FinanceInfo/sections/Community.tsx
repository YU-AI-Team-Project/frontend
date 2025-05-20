import React from "react";

interface CommunityProps {
  activeSubTab: string;
  setSubTab: (tab: string) => void;
}

const Community: React.FC<CommunityProps> = ({ activeSubTab, setSubTab }) => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', gap: '0', marginBottom: '16px', borderBottom: '2px solid #e0e0e0' }}>
        <button className={`sub-tab ${activeSubTab === 'timeline' ? 'active' : ''}`} onClick={() => setSubTab('timeline')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'timeline' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'timeline' ? 'bold' : 'normal' }}>타임라인</button>
        <button className={`sub-tab ${activeSubTab === 'insight' ? 'active' : ''}`} onClick={() => setSubTab('insight')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'insight' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'insight' ? 'bold' : 'normal' }}>인사이트</button>
        <button className={`sub-tab ${activeSubTab === 'prediction' ? 'active' : ''}`} onClick={() => setSubTab('prediction')} style={{ flex: '1', textAlign: 'center', whiteSpace: 'nowrap', padding: '8px 0', borderBottom: activeSubTab === 'prediction' ? '2px solid #e60023' : 'none', background: 'none', border: 'none', color: '#666', fontWeight: activeSubTab === 'prediction' ? 'bold' : 'normal' }}>종목예측</button>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>{activeSubTab === 'timeline' ? '타임라인' : activeSubTab === 'insight' ? '인사이트' : '종목예측'}</h2>
        <p>이곳에 {activeSubTab} 내용이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default Community;