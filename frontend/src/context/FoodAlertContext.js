import React, { createContext, useContext } from 'react';
import { useFoodAlert } from '../hooks/useFoodAlert';

const FoodAlertContext = createContext();

export const useFoodAlertContext = () => {
  const context = useContext(FoodAlertContext);
  if (!context) {
    throw new Error('useFoodAlertContext must be used within a FoodAlertProvider');
  }
  return context;
};

export const FoodAlertProvider = ({ children }) => {
  const alertHook = useFoodAlert();

  return (
    <FoodAlertContext.Provider value={alertHook}>
      {children}
    </FoodAlertContext.Provider>
  );
};
