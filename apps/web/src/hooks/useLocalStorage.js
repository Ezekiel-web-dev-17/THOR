import { useSyncExternalStore, useCallback } from 'react';

export default function useLocalStorage(key, initialValue) {
  const subscribe = useCallback((callback) => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        callback();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  const getSnapshot = () => {
    if (typeof window === 'undefined') return initialValue;
    const saved = localStorage.getItem(key);
    return saved ? saved : initialValue;
  };

  const getServerSnapshot = () => initialValue;

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = (newValue) => {
    localStorage.setItem(key, newValue);
    // Manually trigger re-render by dispatching storage event
    window.dispatchEvent(new StorageEvent('storage', { key }));
  };

  return [value, setValue];
}

