import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, Grid, Typography,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IProduct } from '../../hooks/userFetchDashboard';

interface IProps {
  products: IProduct[];
  classes: ClassNameMap;
}

const ProductList = ({ products, classes }: IProps) => (
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
            <Button size="small">Add to cart</Button>
          </CardActions>
        </Card>
      </Grid>
    )) : <span>Loading...</span>}
  </Grid>
);

export default ProductList;
