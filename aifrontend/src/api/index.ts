// Re-export everything from the API modules
export * from './types';
export * from './apiClient';

// Auth API
export * as authApi from './auth/authApi';

// Watchlist API
export * as watchlistApi from './watchlist/watchlistApi';

// Can add more API modules here as the application grows 