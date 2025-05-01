// MCQContext.tsx
import { createContext, useContext } from 'react';

import { MCQContextType } from './MCQContextTypes';

export const MCQContext = createContext<MCQContextType | null>(null);

export const useMCQContext = () => {
  const context = useContext(MCQContext);
  if (!context) {
    throw new Error('useMCQContext must be used within an MCQProvider');
  }
  return context;
};
