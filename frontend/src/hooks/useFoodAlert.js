import { useState, useCallback } from 'react';

export const useFoodAlert = () => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    action: 'Save',
    showConfirmButton: false,
    onConfirm: null
  });

  const showAlert = useCallback(({ type = 'success', title, message, action = 'Save', showConfirmButton = false, onConfirm = null }) => {
    setAlertState({
      isOpen: true,
      type,
      title,
      message,
      action,
      showConfirmButton,
      onConfirm
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Convenience methods for common alert types
  const showSuccess = useCallback((title, message) => {
    showAlert({ type: 'success', title, message });
  }, [showAlert]);

  const showFavorite = useCallback((title, message) => {
    showAlert({ type: 'favorite', title, message });
  }, [showAlert]);

  const showSave = useCallback((title, message) => {
    showAlert({ type: 'save', title, message });
  }, [showAlert]);

  const showWarning = useCallback((title, message) => {
    showAlert({ type: 'warning', title, message });
  }, [showAlert]);

  const showConfirmation = useCallback((title, message, action = 'Confirm', onConfirm) => {
    showAlert({ 
      type: 'warning', 
      title, 
      message, 
      action, 
      showConfirmButton: true, 
      onConfirm 
    });
  }, [showAlert]);

  return {
    alertState,
    showAlert,
    hideAlert,
    showSuccess,
    showFavorite,
    showSave,
    showWarning,
    showConfirmation
  };
};
