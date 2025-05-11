import React from "react";
import "./TabContent.css";

interface TabContentProps {
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

export default TabContent;
