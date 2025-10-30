import { useState, useCallback } from 'react';

export const useToast = (duration = 3000) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const newToast = { id: Date.now(), message, type };
    setToasts(currentToasts => [...currentToasts, newToast]);
    setTimeout(() => setToasts(currentToasts => currentToasts.filter(t => t.id !== newToast.id)), duration);
  }, [duration]);

  return { toasts, showToast };
};
