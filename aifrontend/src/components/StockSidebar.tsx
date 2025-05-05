import React, { useState } from "react";
import "./StockSidebar.css";

type StockItem = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  category: "국내종목" | "해외종목" | "가상화폐";
};

const stockList: StockItem[] = [
  { name: "삼성전자", symbol: "005930", price: 54300, change: -2.16, category: "국내종목" },
  { name: "에코프로", symbol: "086520", price: 50200, change: -1.57, category: "국내종목" },
  { name: "알테오젠", symbol: "196170", price: 356500, change: +1.57, category: "국내종목" },
  { name: "애플", symbol: "AAPL", price: 204.21, change: +0.65, category: "해외종목" },
  { name: "마이크로소프트", symbol: "MSFT", price: 432.35, change: -0.67, category: "해외종목" },
  { name: "테슬라", symbol: "TSLA", price: 286.49, change: -0.25, category: "해외종목" },
  { name: "비트코인", symbol: "KRW-BTC", price: 133810000, change: -1.36, category: "가상화폐" },
  { name: "이더리움", symbol: "KRW-ETH", price: 2575000, change: -1.0, category: "가상화폐" },
];

const categories = ["국내종목", "해외종목", "가상화폐"] as const;

const StockSidebar: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const getChangeClass = (change: number) => {
    if (change > 0) return "positive";
    if (change < 0) return "negative";
    return "neutral";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="menu-icon">☰</span>
        <span className="title">새 관심목록</span>
      </div>

      <button className="add-btn">+ 종목추가</button>

      {categories.map((cat) => (
        <div key={cat} className="category-section">
          <div className="category-title">{cat}</div>
          {stockList
            .filter((stock) => stock.category === cat)
            .map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => setSelectedSymbol(stock.symbol)}
                className={`stock-item ${selectedSymbol === stock.symbol ? "selected" : ""}`}
              >
                <div className="stock-header">
                  <span>{stock.name}</span>
                  <span className={`change ${getChangeClass(stock.change)}`}>
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </span>
                </div>
                <div className="stock-sub">
                  {stock.symbol} · {stock.price.toLocaleString()}원
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default StockSidebar;


