import React from 'react';
import buildClient from '../api';

export interface ICategory {
  id: string;
  title: string;
}

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

const useFetchDashboard = (setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>) => {
  const axiosInstance = buildClient();

  const [cates, setCates] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/dashboard');
        const { categories, productsFirstCate } = res.data.data;
        setCates(categories);
        setProducts(productsFirstCate);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);
  return [cates];
};

export default useFetchDashboard;
