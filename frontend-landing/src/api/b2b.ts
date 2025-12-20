import apiClient from './client';

export interface CompanyData {
  nip: string;
  name: string;
  address: string;
  regon: string;
  is_active: boolean;
}

export const b2bApi = {
  // Pobieranie danych firmy po NIP
  getCompany: async (nip: string): Promise<CompanyData> => {
    // Nginx przekierowuje /api/b2b/companies -> service-b2b /api/v1/companies
    const response = await apiClient.get<CompanyData>(`/b2b/companies/${nip}`);
    return response.data;
  }
};
