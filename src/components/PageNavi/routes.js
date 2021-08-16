import React, { useEffect, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import {
  Mentor,
  CareerTeach,
  CareerInfo,
  About,
  Search
} from '../../pages';
import Header from './header';
import MainPage from '../../pages/Main/main';
import Personal from '../../pages/Personal/personal';
import ViewPost from '../../pages/Post/viewPost';
import Login from '../../pages/Login/Login';
import Callback from '../../pages/callback';
import Account from '../Personal/account';
import Profile from '../Personal/profile';
import Logout from '../../pages/Logout/Logout';
import VerifyRequest from '../../pages/Signup/verify';
import EmailSignup from '..//../pages/Signup/emailSignup';
import AfterSignup from '../../pages/Signup/afterSignup';
import ProfileRequest from '../SignUp/requestProfile';
import PurchaseHistory from '../../pages/Personal/purchaseHistory';

import axios from 'axios';

export default function Nav ({
  profile, profileHandler, isLogin, loginHandler,
  accessToken, tokenHandler, loginType, typeHandler,
  searchData, searchDataHandler
}) {
  const history = useHistory();

  const [counter, countHandler] = useState(0);
  const [isSearching, searchingToggler] = useState(false);

  const trigger = () => {
    countHandler(counter + 1);
  };
  useEffect(profileDetailHandler, [counter]);

  function accountDetailHandler () {
    history.push('/detail/profile');
  }
  function profileDetailHandler () {
    if (counter >= 1) {
      history.push('/');
      const url = process.env.REACT_APP_NODE_ENV === 'development'
        ? 'https://localhost:4000/profile'
        : 'https://back.artoring.com/profile';
      const Time = setInterval(() => {
        if (profile.major !== '') {
          clearInterval(
            Time
          );

          axios.put(url, { profile, type: loginType }, {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          });

          profileHandler(profile);
        }
      }, 10);
    }
  }
  return (
    <Router history={history}>
      <Header isLogin={isLogin} loginHandler={loginHandler} profile={profile} searchData={searchData} searchDataHandler={searchDataHandler} isSearching={isSearching} searchingToggler={searchingToggler} />
      {/**
       * 렌더를 사용하면 프롭을 내려줄수가 있다. 최상단에서 전달받은 프롭들을 입맛대로 전달한다.
       */}
      <Route exact='true' path='/' render={() => <MainPage profile={profile} profileHandler={profileHandler} isLogin={isLogin} accessToken={accessToken} loginType={loginType} searchDataHandler={searchDataHandler} />} />
      <Route path='/mentor' component={Mentor} />

      <Switch>
        <Route
          exact='true'
          path='/career/growing/:id' render={() => <ViewPost
            profile={profile}
            profileHandler={profileHandler}
            isLogin={isLogin}
            loginType={loginType}
            accessToken={accessToken}
                                                   />}
        />
      </Switch>
      <Route exact='true' path='/career/growing' render={() => <CareerTeach profile={profile} searchDataHandler={searchDataHandler} />} />
      <Route path='/career/signature' component={CareerTeach} />
      <Route path='/career/info' component={CareerInfo} />
      <Route path='/about' component={About} />
      <Route exact='true' path='/search' render={() => <Search searchData={searchData} searchDataHandler={searchDataHandler} profile={profile} searchingToggler={searchingToggler} />} />
      <Route exact='true' path='/search/deep' render={() => <Search searchData={searchData} searchDataHandler={searchDataHandler} profile={profile} searchingToggler={searchingToggler} />} />

      <Route path='/login' render={() => <Login profileHandler={profileHandler} loginHandler={loginHandler} tokenHandler={tokenHandler} typeHandler={typeHandler} />} />
      <Switch>
        <Route
          path='/callback/:type' render={() => <Callback
            loginHandler={loginHandler}
            tokenHandler={tokenHandler}
            typeHandler={typeHandler}
                                               />}
        />
      </Switch>
      {/*
       * 임시토큰을 전달하고 있으나 프로덕션 배포에서는 고정값이 아닌 Props의 값으로 대체
       */}
      <Route exact='true' path='/user/edit' render={() => <Personal profile={profile} profileHandler={profileHandler} token={accessToken} loginType={loginType} />} />
      <Route exact='true' path='/detail/profile' render={() => <Profile profile={profile} profileHandler={profileHandler} onClickHandler={trigger} accessToken={accessToken} />} />
      <Route exact='true' path='/detail/account' render={() => <Account profile={profile} profileHandler={profileHandler} isSignup='true' onClickHandler={accountDetailHandler} accessToken={accessToken} loginType={loginType} />} />
      <Route path='/signup' render={() => <EmailSignup tokenHandler={tokenHandler} loginHandler={loginHandler} typeHandler={typeHandler} />} />
      <Route path='/after/signup' render={() => <AfterSignup />} />
      <Route path='/request' component={ProfileRequest} />
      <Route exact='true' path='/user/reserve' render={() => <PurchaseHistory loginType={loginType} profile={profile} accessToken={accessToken} />} />
      <Route path='/verify' render={() => <VerifyRequest tokenHandler={tokenHandler} loginHandler={loginHandler} typeHandler={typeHandler} profileHandler={profileHandler} />} />
      <Route path='/logout' render={() => <Logout loginType={loginType} accessToken={accessToken} tokenHandler={tokenHandler} profileHandler={profileHandler} loginHandler={loginHandler} />} />
    </Router>
  );
}
