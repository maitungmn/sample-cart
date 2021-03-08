import React from 'react';
import { Box, Button } from '@material-ui/core';
import { IProduct } from '../../hooks/userFetchDashboard';
import TransitionsModal, { IRefObject } from './Modal';

interface IProps {
  productsInCart: IProduct[];
}

const Header = ({ productsInCart }: IProps) => {
  const childRef = React.useRef<IRefObject>();

  const onClickCart = () => {
    childRef?.current?.handleOpen();
  };

  return (
    <div className="header">
      <Box
        display="flex"
        alignItems="center"
      >
        <img src="img/logo.png" alt="trillo" className="logo" />
        <h2>Sample Cart</h2>
      </Box>

      <nav className="user-nav">
        <Button className="user-nav__icon-box" onClick={onClickCart}>
          <svg className="user-nav__icon">
            <use xlinkHref="img/shopping-cart.svg#Capa_1" />
          </svg>
          <span className="user-nav__notification">{productsInCart?.length || 0}</span>
        </Button>
        <div className="user-nav__user">
          <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="User" className="user-nav__user-photo" />
          <span className="user-nav__user-name">Guest</span>
        </div>

        <TransitionsModal ref={childRef} />
      </nav>
    </div>
  );
};

export default Header;
