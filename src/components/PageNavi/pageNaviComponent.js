import React from 'react';
import Routes from './routes';
import '../../css/PageNavi.css';

const Nav = (props) => {
  return (
    <nav className='navbar'>
      <Routes />
    </nav>
  );
};

export default Nav;
