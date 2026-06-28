"use client";

import React, { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createCaseStore, CaseStore, CaseStoreApi } from "./hooks/useCaseStore";

export const CaseFileStoreContext = createContext<CaseStoreApi | undefined>(undefined);

export interface CaseFileProviderProps {
  children: React.ReactNode;
}

export function CaseFileProvider({ children }: CaseFileProviderProps) {
  const storeRef = useRef<CaseStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createCaseStore();
  }

  return (
    <CaseFileStoreContext.Provider value={storeRef.current}>
      {children}
    </CaseFileStoreContext.Provider>
  );
}

export function useCaseStore<T>(selector: (store: CaseStore) => T): T {
  const context = useContext(CaseFileStoreContext);
  if (!context) {
    throw new Error("useCaseStore must be used within a CaseFileProvider");
  }
  return useStore(context, selector);
}
