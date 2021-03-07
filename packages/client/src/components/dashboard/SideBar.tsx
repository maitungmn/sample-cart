import React from 'react';
import { ICategory, IProduct } from '../../hooks/userFetchDashboard';
import buildClient from '../../api';

interface IProps {
  categories: ICategory[];
  cateSelected: string;
  setCateSelected: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const Sidebar = (
  {
    categories, cateSelected, setCateSelected, setProducts,
  }: IProps,
) => {
  const onSelectTab = async (id: string) => {
    if (id === cateSelected) return;

    try {
      const axiosInstance = buildClient();
      const res = await axiosInstance.get(`/products/${id}`);
      setCateSelected(id);
      setProducts(res.data.data || []);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <ul className="side-nav">
      {categories?.length && categories.map((i) => (
        <li key={i.id} className={`side-nav__item${i.id === cateSelected ? ' side-nav__item--active' : ''}`}>
          <a href="#/" className="side-nav__link" onClick={() => onSelectTab(i.id)}>
            <span>{i.title || ''}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
