import { createContext } from 'react';

export interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

export const DevModeContext = createContext<DevModeContextType | undefined>(undefined);
