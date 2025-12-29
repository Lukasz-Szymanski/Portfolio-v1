/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from 'react';

export interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

export const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false);

  const toggleDevMode = () => setIsDevMode(prev => !prev);

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
};
