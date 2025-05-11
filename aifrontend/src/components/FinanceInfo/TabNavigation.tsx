import React from "react";
import "./TabNavigation.css";

interface TabNavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: "market", label: "시장정보" },
    { id: "analysis", label: "종목분석" },
    { id: "signal", label: "종목발굴" },
    { id: "community", label: "커뮤니티" },
    { id: "trading", label: "트레이딩" },
  ];

  return (
    <nav className="tab-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onSelectTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;
