import React from 'react';
import {
  Box, makeStyles,
} from '@material-ui/core';
import useStoreContext from '../../hooks/useStoreContext';
import ProductList from './ProductList';
import Sidebar from './SideBar';
import { ICategory, IProduct } from '../../hooks/userFetchDashboard';
import Header from './Header';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

function App() {
  const classes = useStyles();
  const { categories, products, setProducts } = useStoreContext();

  const [cateSelected, setCateSelected] = React.useState<string>('');

  React.useEffect(() => {
    if (categories?.length) {
      setCateSelected(categories[0].id || '');
    }
  }, [categories]);

  return (
    <>
      <Header />

      <div className="content">
        <nav className="sidebar">
          <Sidebar
            categories={categories as ICategory[]}
            cateSelected={cateSelected}
            setCateSelected={setCateSelected}
            setProducts={setProducts as React.Dispatch<React.SetStateAction<IProduct[]>>}
          />
        </nav>

        <main className="product-view">
          <Box className="overview">
            <ProductList
              products={products as IProduct[]}
              classes={classes}
            />
          </Box>
        </main>
      </div>
    </>
  );
}

export default App;
