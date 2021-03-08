import React from 'react';
import {
  Box,
  Button, Divider,
  Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useStoreContext from '../../../hooks/useStoreContext';
import { IProduct } from '../../../hooks/userFetchDashboard';

interface IQty {
  [key: string]: number;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const Cart = () => {
  const classes = useStyles();

  const {
    productsInCart,
    // setProductsInCart,
  } = useStoreContext();

  const [total, setTotal] = React.useState<number>(0);
  const [mergedProducts, setMergedProducts] = React.useState<IProduct[]>([]);
  const [qty, setQty] = React.useState<IQty>({});

  React.useEffect(() => {
    const onlyID: IQty = {};
    const prodsWithQty = (productsInCart || []).reduce((final: IProduct[], each) => {
      if (!onlyID[each.id]) {
        onlyID[each.id] = 1;
        final.push(each);
      } else {
        // eslint-disable-next-line no-plusplus
        onlyID[each.id]++;
      }

      return final;
    }, []);

    setQty(onlyID);
    setMergedProducts(prodsWithQty);
  }, [productsInCart]);

  React.useEffect(() => {
    const totalPrice = (productsInCart || []).reduce((final, each) => {
      // eslint-disable-next-line no-param-reassign
      final += each.price || 0;
      return final;
    }, 0);
    setTotal(totalPrice);
  }, [productsInCart]);

  return (
    <div>
      <Grid item>
        <Typography variant="h3" className={classes.title}>
          Shopping Cart
        </Typography>
        <List>
          {(mergedProducts || []).map((i, index) => (
            <ListItem key={`${i.id + index}`}>
              <ListItemText
                primary={`${qty?.[i.id] || 0} x ${i.name || ''}`}
              />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small">Remove</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Divider />
      <Box className="cart-action">
        <span>{`Total: ${total}`}</span>
        <Button
          variant="contained"
          color="primary"
        >
          Next step
        </Button>
      </Box>
    </div>
  );
};

export default Cart;
