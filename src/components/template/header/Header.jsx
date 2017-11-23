import React from 'react';
import Menu from '../menu/Menu';
import './Header.css';

const logoStyle = {
  width: '20%',
};

const Header = () => (
  <div className="header">
    <div className="container">
      <a className="logo" href="index.html">
        <img src="https://static.mytaxi.com/images/layout-1/logo.svg" alt="Logo" style={logoStyle} />
      </a>
    </div>
    <Menu />
  </div>
  );

export default Header;
