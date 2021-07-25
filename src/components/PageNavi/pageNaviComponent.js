import React, { useState } from 'react';
import Footer from './footer';
import '../../css/navigation/PageNavi.css';
import Routes from './routes';

// 최상단에서 관리해야할 상태들을 여기서 관리합니다.
const Nav = (props) => {
  // 최상위에서 관리되는 상태들
  const [profile, profileHandler] = useState({});
  const [isLogin, loginHandler] = useState(false);
  const [accessToken, tokenHandler] = useState('');
  const { loginType, typeHandler } = useState('email');

  // 하단 삼항연산자들은 스토리북을 사용할때와 그렇지 않을때 모두 대응이 가능함.
  return (
    <nav className='navbar'>
      <Routes
        profile={props.profile ? props.profile : profile}
        profileHandler={props.profileHandler ? props.profileHandler : profileHandler}
        isLogin={props.isLogin ? props.isLogin : isLogin}
        loginHandler={props.loginHandler ? props.loginHandler : loginHandler}
        accessToken={props.accessToken ? props.accessToken : accessToken}
        loginType={props.loginType ? props.loginType : loginType}
      />
      <Footer />
    </nav>
  );
};

export default Nav;
