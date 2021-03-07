import { Box } from '@material-ui/core';
import React from 'react';
import { IProduct } from '../../hooks/userFetchDashboard';

interface IProps {
  productsInCart: IProduct[];
}

const Header = ({ productsInCart }: IProps) => (
  <div className="header">
    <Box
      display="flex"
      alignItems="center"
    >
      <img src="img/logo.png" alt="trillo" className="logo" />
      <h2>Sample Cart</h2>
    </Box>

    <nav className="user-nav">
      <div className="user-nav__icon-box">
        <svg className="user-nav__icon">
          <use xlinkHref="img/shopping-cart.svg#Capa_1" />
        </svg>
        <span className="user-nav__notification">{productsInCart?.length || 0}</span>
      </div>
      <div className="user-nav__user">
        <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="User" className="user-nav__user-photo" />
        <span className="user-nav__user-name">Guest</span>
      </div>
    </nav>
  </div>
);

export default Header;
