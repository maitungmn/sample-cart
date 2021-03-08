import React from 'react';
import {
  Box,
  Button, Divider,
  Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useStoreContext from '../../../hooks/useStoreContext';
import { IProduct } from '../../../hooks/userFetchDashboard';
import buildClient from '../../../api';
import UserIDCookie from '../../../utils/userID';

interface IQty {
  [key: string]: number;
}

interface IProps {
  setIsOpenUserInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const Cart = ({ setIsOpenUserInfo }: IProps) => {
  const classes = useStyles();

  const {
    productsInCart,
    setProductsInCart,
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

  const onRemoveProd = async (id: string) => {
    try {
      const userID = UserIDCookie.get();
      const axiosInstance = buildClient({ Authorization: userID });
      await axiosInstance.delete(`products/${id}`);
      const cloneProductInCart = [...(productsInCart || [])];
      const indexOfId = cloneProductInCart?.findIndex((i) => i.id === id);
      if (indexOfId >= 0) {
        cloneProductInCart.splice(indexOfId, 1);
        // eslint-disable-next-line no-unused-expressions
        setProductsInCart && setProductsInCart([...cloneProductInCart]);
      }
    } catch (e) {
      alert(e);
    }
  };

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
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onRemoveProd(i.id)}
                >
                  {qty?.[i.id] > 1 ? 'Reduce' : 'Remove'}
                </Button>
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
          disabled={!total}
          onClick={() => setIsOpenUserInfo(true)}
        >
          Next step
        </Button>
      </Box>
    </div>
  );
};

export default Cart;
