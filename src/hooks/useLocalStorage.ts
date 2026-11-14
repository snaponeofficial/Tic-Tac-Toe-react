"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const stored = window.localStorage.getItem(key);
        if (stored !== null) setValue(JSON.parse(stored) as T);
      } catch {
        // Storage can be unavailable in privacy-restricted environments.
      } finally {
        setHydrated(true);
      }
    });
    return () => { active = false; };
  }, [key]);

  const updateValue = useCallback((next: T | ((current: T) => T)) => {
    setValue((current) => {
      const resolved = typeof next === "function" ? (next as (value: T) => T)(current) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // The app remains fully functional without persistence.
      }
      return resolved;
    });
  }, [key]);

  return [value, updateValue, hydrated] as const;
}
