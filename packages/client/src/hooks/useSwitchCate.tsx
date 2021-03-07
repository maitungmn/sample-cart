import React from 'react';
import buildClient from '../api';
import { ICategory } from './userFetchDashboard';
import useIsMount from './useIsMount';

const useSwitchCate = (cateId: string, categories: ICategory[]) => {
  const axiosInstance = buildClient();
  const isMount = useIsMount();

  React.useEffect(() => {
    (async () => {
      try {
        // eslint-disable-next-line no-console
        console.log('isMount', isMount);
        // eslint-disable-next-line no-console
        console.log('cateId', cateId);
        // eslint-disable-next-line no-console
        console.log('categories', categories);
        if (cateId && categories?.length) {
          const res = await axiosInstance.get(`/products/${cateId}`);
          // eslint-disable-next-line no-console
          console.log('res', res.data);
        }
      } catch (e) {
        alert(e);
      }
    })();
  }, [cateId, categories]);
};

export default useSwitchCate;
