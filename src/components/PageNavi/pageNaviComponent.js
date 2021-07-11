import React from 'react';
import Routes from './routes';
import Footer from './footer';
import '../../css/PageNavi.css';

const Nav = (props) => {
  return (
    <nav className='navbar'>
      <Routes />
      <Footer />
    </nav>
  );
};

export default Nav;
