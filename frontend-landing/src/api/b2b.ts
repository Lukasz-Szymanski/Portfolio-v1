import apiClient from './client';

export interface CompanyData {
  nip: string;
  name: string;
  address: string;
  regon: string;
  is_active: boolean;
}

export interface CompanyResponse {
  source: string;
  data: CompanyData;
}

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

export const b2bApi = {
  // Pobieranie danych firmy po NIP
  getCompany: async (nip: string): Promise<CompanyResponse> => {
    // Nginx przekierowuje /api/b2b/companies -> service-b2b /api/v1/companies
    const response = await apiClient.get<CompanyResponse>(`/b2b/companies/${nip}`);
    // Backend zwraca { source: "...", data: { ... } }
    return response.data;
  },

  // Formularz kontaktowy
  sendContactMessage: async (data: {name: string, email: string, message: string}) => {
    // Nginx: /api/b2b/contact -> service-b2b /api/v1/contact
    const response = await apiClient.post('/b2b/contact', data);
    return response.data;
  },

  // Status Systemu (Dashboard Overview)
  getSystemStatus: async (): Promise<SystemStatus> => {
    const response = await apiClient.get<SystemStatus>('/b2b/system-status');
    return response.data;
  }
};
