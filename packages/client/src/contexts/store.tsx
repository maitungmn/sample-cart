import React from 'react';
import useFetchDashboard, { ICategory, IProduct } from '../hooks/userFetchDashboard';

interface IState {
  categories: ICategory[];
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const StoreContext = React.createContext<Partial<IState>>({});

export const StoreProvider = ({ children }: any) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [categories] = useFetchDashboard(setProducts);

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        setProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
