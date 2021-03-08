import React from 'react';
import useFetchDashboard, { ICategory, IProduct } from '../hooks/userFetchDashboard';
import useFetchUserCart from '../hooks/useFetchUserCart';

interface IState {
  categories: ICategory[];
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  productsInCart: IProduct[];
  setProductsInCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const StoreContext = React.createContext<Partial<IState>>({});

export const StoreProvider = ({ children }: any) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [productsInCart, setProductsInCart] = React.useState<IProduct[]>([]);
  const [categories] = useFetchDashboard(setProducts);
  useFetchUserCart(setProductsInCart);

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        setProducts,
        productsInCart,
        setProductsInCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
