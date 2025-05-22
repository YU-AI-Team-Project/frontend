// src/components/AddStockModal.tsx

import React, { useState } from "react";
import { searchStocks, addFavoriteStock } from "../api/api";
import { StockItem } from "../types";

type Props = {
  onClose: () => void;
  onStockAdded: () => void;
};

const AddStockModal: React.FC<Props> = ({ onClose, onStockAdded }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockItem[]>([]);

  const handleSearch = async () => {
    const stocks = await searchStocks(query);
    setResults(stocks);
  };

  const handleAdd = async (stock: StockItem) => {
    await addFavoriteStock(stock);
    onStockAdded(); // 새로고침
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal">
      <input
        placeholder="종목명을 검색하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <div className="search-results">
        {results.map((stock) => (
          <div key={stock.symbol} onClick={() => handleAdd(stock)} className="search-item">
            <div>{stock.name}</div>
            <div>{stock.symbol}</div>
          </div>
        ))}
      </div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default AddStockModal;
