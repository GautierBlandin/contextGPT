import type { StateCreator } from 'zustand/vanilla';
import React, { createContext, useContext, useMemo } from 'react';
import { create, StoreApi, useStore } from 'zustand';

export function defineStore<STORE>(stateCreator: StateCreator<STORE>) {
  function StoreProvider({ children }: { children: React.ReactNode }) {
    const store = useMemo(() => create<STORE>(stateCreator), []);
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
  }

  const StoreContext = createContext<StoreApi<STORE> | null>(null);

  function useZustandStore<R>(selector: (state: STORE) => R) {
    const store = useContext(StoreContext);
    if (!store) throw new Error('');
    return useStore(store, selector);
  }

  return [StoreProvider, useZustandStore] as const;
}
