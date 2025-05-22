// src/api/api.ts

import { StockItem } from "../types";

// 관심종목 목록 불러오기
export async function fetchFavoriteStocks(): Promise<StockItem[]> {
  const res = await fetch("/stocks/interests/{userID}");
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return await res.json();
}

// 종목 검색
export async function searchStocks(query: string): Promise<StockItem[]> {
  const res = await fetch(`/stocks/interests/{userID}`);
  if (!res.ok) throw new Error("Search failed");
  return await res.json();
}

// 종목 추가
export async function addFavoriteStock(stock: StockItem): Promise<void> {
  await fetch("/stocks/interests/{userID}", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
}
