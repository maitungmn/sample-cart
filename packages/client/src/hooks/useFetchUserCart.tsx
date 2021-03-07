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
        // eslint-disable-next-line no-console
        console.log('res', res.data.data);
        setProductsInCart(res.data.data || []);
      } catch (e) {
        alert(e);
      }
    })();
  }, [userID]);
};

export default useFetchUserCart;
