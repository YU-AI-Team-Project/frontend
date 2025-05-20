import React, { useState } from "react";
import TabContent from "./TabContent";
import MarketInfo from "./sections/MarketInfo";
import StockAnalysis from "./sections/StockAnalysis";
import TradingSignal from "./sections/TradingSignal";
import Community from "./sections/Community";
import Trading from "./sections/Trading";

const FinanceTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("market");
  const [subTab, setSubTab] = useState<string>("summary");

  const renderContent = () => {
    switch (activeTab) {
      case "market":
        return <MarketInfo activeSubTab={subTab} setSubTab={setSubTab} />;
      case "analysis":
        return <StockAnalysis activeSubTab={subTab} setSubTab={setSubTab} />;
      case "signal":
        return <TradingSignal activeSubTab={subTab} setSubTab={setSubTab} />;
      case "community":
        return <Community activeSubTab={subTab} setSubTab={setSubTab} />;
      case "trading":
        return <Trading activeSubTab={subTab} setSubTab={setSubTab} />;
      default:
        return <MarketInfo activeSubTab={subTab} setSubTab={setSubTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <div style={{ width: '420px', padding: '8px 0' }}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', justifyContent: 'space-between', backgroundColor: '#f9f9f9', borderBottom: '2px solid #ddd', padding: '4px' }}>
          <div className={`tab ${activeTab === 'market' ? 'active' : ''}`} style={{ color: activeTab === 'market' ? '#e60023' : '#333' }} onClick={() => { setActiveTab('market'); setSubTab('summary'); }}>시장정보</div>
          <div className={`tab ${activeTab === 'analysis' ? 'active' : ''}`} style={{ color: activeTab === 'analysis' ? '#e60023' : '#333' }} onClick={() => { setActiveTab('analysis'); setSubTab('info'); }}>종목분석</div>
          <div className={`tab ${activeTab === 'signal' ? 'active' : ''}`} style={{ color: activeTab === 'signal' ? '#e60023' : '#333' }} onClick={() => { setActiveTab('signal'); setSubTab('signal'); }}>종목발굴</div>
          <div className={`tab ${activeTab === 'community' ? 'active' : ''}`} style={{ color: activeTab === 'community' ? '#e60023' : '#333' }} onClick={() => { setActiveTab('community'); setSubTab('timeline'); }}>커뮤니티</div>
          <div className={`tab ${activeTab === 'trading' ? 'active' : ''}`} style={{ color: activeTab === 'trading' ? '#e60023' : '#333' }} onClick={() => { setActiveTab('trading'); setSubTab('order'); }}>트레이딩</div>
        </div>

        <div style={{ marginTop: '8px', backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {renderContent()}
        </div>
      </div> 
    </div>
  );
};

export default FinanceTab;