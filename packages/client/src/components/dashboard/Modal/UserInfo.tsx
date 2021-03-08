import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Grid, Input,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import UserIDCookie from '../../../utils/userID';
import buildClient from '../../../api';

interface IUserInfo {
  name: string;
  address: string;
  phone: string;
  email: string;

  [key: string]: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const UserInfo = () => {
  const classes = useStyles();
  const history = useHistory();

  const [userInfo, setUserInfo] = React.useState<IUserInfo>(
    {
      address: '', email: '', name: '', phone: '',
    },
  );

  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    const {
      name, address, email, phone,
    } = userInfo;
    if (name && address && email && phone) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userInfo]);

  const onNext = async () => {
    try {
      const userID = UserIDCookie.get();
      const axiosInstance = buildClient({ Authorization: userID });
      const {
        name, address, email, phone,
      } = userInfo;
      await axiosInstance.post('/pay', {
        name,
        address,
        email,
        phone,
      });
      history.push('/payment');
    } catch (e) {
      alert(e);
    }
  };

  // eslint-disable-next-line max-len
  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string) => {
    setUserInfo({
      ...userInfo,
      [type]: e.target.value || '',
    });
  };

  return (
    <div>
      <Grid item>
        <Typography variant="h3" className={classes.title}>
          User Information
        </Typography>
        <form id="user-form" noValidate autoComplete="off">
          <Input
            id="name"
            placeholder="Name"
            required
            fullWidth
            onChange={(e) => onInput(e, 'name')}
          />
          <Input
            id="address"
            placeholder="Address"
            required
            fullWidth
            onChange={(e) => onInput(e, 'address')}
          />
          <Input
            id="phone"
            placeholder="Phone"
            required
            fullWidth
            onChange={(e) => onInput(e, 'phone')}
          />
          <Input
            id="email"
            placeholder="Email"
            required
            fullWidth
            onChange={(e) => onInput(e, 'email')}
          />
        </form>
      </Grid>
      <Divider />
      <Box className="cart-action cart-action-right">
        <Button
          variant="contained"
          color="primary"
          disabled={isDisabled}
          onClick={onNext}
        >
          Next step
        </Button>
      </Box>
    </div>
  );
};

export default UserInfo;
