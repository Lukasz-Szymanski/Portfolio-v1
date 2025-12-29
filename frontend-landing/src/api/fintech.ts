import apiClient from './client';

export interface Account {
  id: string;
  user_id: number;
  account_number: string;
  balance: string;
  currency: string;
}

export interface Transaction {
  id: string;
  amount: string;
  transaction_type: string;
  description: string;
  created_at: string;
}

export interface TransferRequest {
  sender_account_id: string;
  receiver_account_number: string;
  amount: number;
  description: string;
}

export const fintechApi = {
  // Pobieranie kont użytkownika
  getAccounts: async (userId: number): Promise<Account[]> => {
    const response = await apiClient.get<Account[]>(`/fintech/accounts/${userId}`);
    return response.data;
  },

  // Wykonanie przelewu
  makeTransfer: async (data: TransferRequest) => {
    const response = await apiClient.post('/fintech/accounts/transfer', data);
    return response.data;
  },

  // Pobieranie szczegółów konta
  getAccountDetails: async (accountNumber: string): Promise<Account> => {
    const response = await apiClient.get<Account>(`/fintech/accounts/details/${accountNumber}`);
    return response.data;
  },

  // Pobieranie historii transakcji
  getTransactions: async (accountId: string): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>(`/fintech/accounts/transactions/${accountId}`);
    return response.data;
  },

  // Pobieranie PDF
  getTransactionPdf: async (transactionId: string) => {
    const response = await apiClient.get(`/fintech/accounts/transactions/${transactionId}/pdf`, {
        responseType: 'blob' // Ważne dla plików binarnych
    });
    return response.data;
  },

  // Inicjalizacja Demo
  initDemoAccount: async (userId: number): Promise<Account> => {
    const response = await apiClient.post<Account>(`/fintech/accounts/init-demo/${userId}`);
    return response.data;
  },

  // Stripe Checkout
  createStripeSession: async (accountId: string): Promise<{ url: string }> => {
    const response = await apiClient.post<{ url: string }>(`/fintech/accounts/stripe/create-checkout-session/${accountId}`);
    return response.data;
  }
};
