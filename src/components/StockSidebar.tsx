// src/components/StockSidebar.tsx

import React, { useEffect, useState } from "react";
import "./StockSidebar.css";
import { StockItem } from "../types";
import { fetchFavoriteStocks } from "../api/api";
import AddStockModal from "./AddStockModal";

const categories = ["국내종목", "해외종목", "가상화폐"] as const;

const StockSidebar: React.FC = () => {
  const [stockList, setStockList] = useState<StockItem[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadStocks = async () => {
    const stocks = await fetchFavoriteStocks();
    setStockList(stocks);
  };

  useEffect(() => {
    loadStocks();
  }, []);

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

      <button className="add-btn" onClick={() => setShowModal(true)}>
        + 종목추가
      </button>

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

      {showModal && (
        <AddStockModal
          onClose={() => setShowModal(false)}
          onStockAdded={loadStocks}
        />
      )}
    </div>
  );
};

export default StockSidebar;




