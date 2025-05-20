import apiRequest, { HttpMethod } from '../apiClient';
import { 
  Watchlist, 
  WatchlistSummary, 
  CreateWatchlistRequest, 
  AddStockToWatchlistRequest 
} from '../types';

/**
 * Get all watchlists for the current authenticated user
 */
export const getAllWatchlists = async (): Promise<WatchlistSummary[]> => {
  const response = await apiRequest<WatchlistSummary[]>('/watchlists');
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data || [];
};

/**
 * Get a specific watchlist with all its stocks
 */
export const getWatchlist = async (watchlistId: string): Promise<Watchlist> => {
  const response = await apiRequest<Watchlist>(`/watchlists/${watchlistId}`);
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data as Watchlist;
};

/**
 * Create a new watchlist
 */
export const createWatchlist = async (data: CreateWatchlistRequest): Promise<Watchlist> => {
  const response = await apiRequest<Watchlist>(
    '/watchlists', 
    HttpMethod.POST, 
    data
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data as Watchlist;
};

/**
 * Update a watchlist's name or description
 */
export const updateWatchlist = async (
  watchlistId: string, 
  data: Partial<CreateWatchlistRequest>
): Promise<Watchlist> => {
  const response = await apiRequest<Watchlist>(
    `/watchlists/${watchlistId}`, 
    HttpMethod.PUT, 
    data
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data as Watchlist;
};

/**
 * Delete a watchlist
 */
export const deleteWatchlist = async (watchlistId: string): Promise<void> => {
  const response = await apiRequest<void>(
    `/watchlists/${watchlistId}`, 
    HttpMethod.DELETE
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
};

/**
 * Add a stock to a watchlist
 */
export const addStockToWatchlist = async (data: AddStockToWatchlistRequest): Promise<Watchlist> => {
  const response = await apiRequest<Watchlist>(
    `/watchlists/${data.watchlistId}/stocks`, 
    HttpMethod.POST, 
    { symbol: data.symbol }
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
  
  return response.data as Watchlist;
};

/**
 * Remove a stock from a watchlist
 */
export const removeStockFromWatchlist = async (
  watchlistId: string, 
  symbol: string
): Promise<void> => {
  const response = await apiRequest<void>(
    `/watchlists/${watchlistId}/stocks/${symbol}`, 
    HttpMethod.DELETE
  );
  
  if (response.error) {
    throw new Error(response.error);
  }
}; 