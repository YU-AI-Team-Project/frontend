export interface StockItem {
  name: string;
  symbol: string;
  price: number;
  change: number;
  category: "국내종목" | "해외종목" | "가상화폐";
}

export interface Watchlist {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  stocks: StockItem[];
}

export interface WatchlistSummary {
  id: string;
  name: string;
  stockCount: number;
  updatedAt: string;
}

export interface CreateWatchlistRequest {
  name: string;
  description?: string;
}

export interface AddStockToWatchlistRequest {
  symbol: string;
  watchlistId: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  profileImageUrl?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  fullName?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
} 