import apiClient from './client';

export interface CryptoPrices {
  bitcoin: string;
  ethereum: string;
  currency: string;
}

export const monitorApi = {
  getPrices: async (): Promise<CryptoPrices> => {
    // Uderzamy w endpoint /api/v1/crypto przez Nginx /api/b2b/crypto
    const response = await apiClient.get<CryptoPrices>('/b2b/crypto');
    return response.data;
  }
};