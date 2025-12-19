import apiClient from './client';

export interface Account {
  id: string;
  user_id: number;
  account_number: string;
  balance: string;
  currency: string;
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
  }
};
