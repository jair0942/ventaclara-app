import { useState, useEffect } from 'react';

// Hook personalizado para leer y escribir en LocalStorage automáticamente
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error guardando en LocalStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
