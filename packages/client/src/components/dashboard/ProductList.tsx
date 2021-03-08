import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, Grid, Typography,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IProduct } from '../../hooks/userFetchDashboard';
import UserIDCookie from '../../utils/userID';
import buildClient from '../../api';

interface IProps {
  products: IProduct[];
  classes: ClassNameMap;
  productsInCart: IProduct[];
  setProductsInCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const ProductList = ({
  products, classes, productsInCart, setProductsInCart,
}: IProps) => {
  const [productSelected, setProductSelected] = React.useState<string>('');

  const onAddProduct = async (product: IProduct) => {
    setProductSelected(product.id);
    let userID = UserIDCookie.get();
    if (!userID) {
      userID = UserIDCookie.set();
    }

    try {
      const axiosInstance = buildClient({ Authorization: userID });
      await axiosInstance.post(`/products/${product.id}`);
      setProductsInCart([...productsInCart, product]);
    } catch (e) {
      alert(e);
    }
    setProductSelected('');
  };

  return (
    <Grid container spacing={1}>
      {products?.length ? products.map((i) => (
        <Grid key={i.id} item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            {i.imageUrl ? (
              <CardMedia
                className={classes.media}
                image={i.imageUrl || ''}
                title={i.name}
              />
            ) : (
              <span>Loading...</span>
            )}
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {i.name}
              </Typography>
            </CardContent>
            <CardActions className="button-add-to-cart">
              <Button
                size="small"
                disabled={productSelected === i.id}
                onClick={() => onAddProduct(i)}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )) : <span>Loading...</span>}
    </Grid>
  );
};

export default ProductList;
