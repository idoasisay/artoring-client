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

import MainPage from '../../pages/main/main';
import Header from './header';

export default function Nav (props) {
  return (
    <Router>
      <Header />
      <Route exact path='/' component={MainPage} />
      <Route path='/mentor' component={Mentor} />
      <Route path='/career/teach' component={CareerTeach} />
      <Route path='/career/growing' component={CareerTeach} />
      <Route path='/career/signature' component={CareerTeach} />
      <Route path='/careerinfo' component={CareerInfo} />
      <Route path='/about' component={About} />
      <Route path='/search' component={Search} />
      <Route path='/login' component={Login} />
    </Router>
  );
}
