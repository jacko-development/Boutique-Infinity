import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNuiEvent } from '../hooks/useNuiEvent';

interface VisibilityProviderValue {
  setVisibleComponent: (component: string, visible: boolean) => void;
  visibleComponents: { [key: string]: boolean };
}

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visibleComponents, setVisibleComponents] = useState<{ [key: string]: boolean }>({});

  useNuiEvent<{ component: string; visible: boolean }>('setVisible', ({ component, visible }) => {
    setVisibleComponents((prev) => ({ ...prev, [component]: visible }));
  });


  const setVisibleComponent = (component: string, visible: boolean) => {
    setVisibleComponents((prev) => ({ ...prev, [component]: visible }));
  };

  return (
    <VisibilityCtx.Provider value={{ visibleComponents, setVisibleComponent }}>
      {children}
    </VisibilityCtx.Provider>
  );
};

export const useVisibility = () =>
  useContext<VisibilityProviderValue>(VisibilityCtx as React.Context<VisibilityProviderValue>);
