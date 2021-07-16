import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
  Mentor,
  CareerTeach,
  CareerInfo,
  About,
  Search,
  Login
} from '../../pages';
import Header from './header';
import MainPage from '../../pages/Main/main';
import Personal from '../../pages/Personal/personal';

export default function Nav ({ profile, profileHandler }) {
  return (
    <Router>
      <Header />
      <Route exact path='/' render={() => <MainPage profile={profile} profileHandler={profileHandler} type='email' />} />
      <Route path='/mentor' component={Mentor} />
      <Route path='/career/teach' component={CareerTeach} />
      <Route path='/career/growing' component={CareerTeach} />
      <Route path='/career/signature' component={CareerTeach} />
      <Route path='/careerinfo' component={CareerInfo} />
      <Route path='/about' component={About} />
      <Route path='/search' component={Search} />
      <Route path='/login' component={Login} />
      <Route path='/user/edit' render={() => <Personal profile={profile} profileHandler={profileHandler} token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwibmFtZSI6InRlc3QgdXNlciIsImlhdCI6MTYyNjIzNTQ5OH0.UW45M6t1kbBKN-OUl8HiaLCae8eYxMue_6SxXsMscWQ' type='email' />} />
    </Router>
  );
}
