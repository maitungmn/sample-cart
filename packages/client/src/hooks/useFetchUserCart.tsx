import React from 'react';
import buildClient from '../api';
import { IProduct } from './userFetchDashboard';
import UserIDCookie from '../utils/userID';

const useFetchUserCart = (setProductsInCart: React.Dispatch<React.SetStateAction<IProduct[]>>) => {
  const userID = UserIDCookie.get();

  React.useEffect(() => {
    (async () => {
      if (!userID) return;
      try {
        const axiosInstance = buildClient({ Authorization: userID });
        const res = await axiosInstance.get('/products');
        setProductsInCart(res.data.data || []);
      } catch (e) {
        alert(e);
      }
    })();
  }, [userID]);
};

export default useFetchUserCart;
