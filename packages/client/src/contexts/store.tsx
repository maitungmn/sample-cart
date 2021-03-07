import React from 'react';
import { IState } from './store.dto';

export const StoreContext = React.createContext<Partial<IState>>({});

export const StoreProvider = ({ children }: any) => (
  <StoreContext.Provider
    value={{}}
  >
    {children}
  </StoreContext.Provider>
);
