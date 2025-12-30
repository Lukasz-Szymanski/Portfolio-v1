/**
 * Global TypeScript Types and Interfaces
 * Shared across the portfolio frontend application
 */

// ============================================
// FINTECH API TYPES
// ============================================

/**
 * Bank account from the fintech service
 */
export interface Account {
  id: string;
  user_id: number;
  account_number: string;
  balance: string;
  currency: string;
  created_at?: string;
}

/**
 * Financial transaction record
 */
export interface Transaction {
  id: string;
  account_id?: string;
  amount: string;
  transaction_type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | string;
  description: string;
  created_at: string;
  recipient_account?: string;
}

/**
 * Request data for initiating a transfer between accounts
 */
export interface TransferRequest {
  sender_account_id: string;
  receiver_account_number: string;
  amount: number;
  description: string;
}

// ============================================
// B2B API TYPES
// ============================================

/**
 * Polish company data from B2B verification service
 */
export interface CompanyData {
  nip: string;
  name: string;
  address?: string;
  regon?: string;
  is_active?: boolean;
  status?: string;
}

/**
 * Company data response wrapper from B2B API
 */
export interface CompanyResponse {
  source: string;
  data: CompanyData;
}

/**
 * System status information including B2B and monitoring metrics
 */
export interface SystemStatus {
  b2b: {
    companies_checked: number;
    cache_hits: number;
    cache_misses: number;
  };
  monitor: {
    bitcoin: string;
    ethereum: string;
    last_update: string;
  };
  services: {
    b2b: string;
    fintech: string;
    monitor: string;
  };
}

// ============================================
// CRYPTO TYPES
// ============================================

/**
 * Cryptocurrency price data from price monitor service
 */
export interface CryptoPrices {
  bitcoin: number;
  ethereum: number;
  timestamp?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Standard API error response
 */
export interface ApiError {
  message: string;
  detail?: string;
  status?: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

// ============================================
// CONTACT FORM TYPES
// ============================================

/**
 * Contact form submission data
 */
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// ============================================
// UI STATE TYPES
// ============================================

/**
 * Loading state for async operations
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}
