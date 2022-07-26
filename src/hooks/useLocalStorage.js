import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch (err) {
      console.log(err.message);
      toast.error('LocalStorage is corrupted :(');
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
