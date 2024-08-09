import { useEffect, useState } from "react";

export default function usePersistedState<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [state, setInternalState] = useState<T>(initialValue);

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (!value) return;

    setInternalState(JSON.parse(value));
  }, [key]);

  const setState = (value: T) => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
    setInternalState(value);
  };

  return [state, setState];
}
