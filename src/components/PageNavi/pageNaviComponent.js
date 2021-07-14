import React from 'react';
import Footer from './footer';
import '../../css/navigation/PageNavi.css';
import Routes from './routes';

const Nav = (props) => {
  return (
    <nav className='navbar'>
      <Routes />
      <Footer />
    </nav>
  );
};

export default Nav;
