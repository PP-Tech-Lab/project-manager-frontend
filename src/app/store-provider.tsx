'use client'

import { useRef } from 'react';
import { AppStore, makeStore } from '@/lib/stores/store';
import { Provider } from 'react-redux';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
