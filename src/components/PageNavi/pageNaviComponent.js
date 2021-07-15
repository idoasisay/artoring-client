import React, { useState } from 'react';
import Footer from './footer';
import '../../css/navigation/PageNavi.css';
import Routes from './routes';

const Nav = (props) => {
  const [profile, profileHandler] = useState({});

  return (
    <nav className='navbar'>
      <Routes profile={profile} profileHandler={profileHandler} />
      <Footer />
    </nav>
  );
};

export default Nav;
