import React from "react";
import StockSidebar from "./components/StockSidebar"


const App: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <StockSidebar />
      <div style={{ padding: "20px" }}>
        종목 상세정보 영역
      </div>
    </div>
  );
};

export default App;
