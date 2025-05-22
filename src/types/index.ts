// src/types/index.ts

export type StockItem = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  category: "국내종목" | "해외종목" | "가상화폐";
};
