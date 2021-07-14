import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
  Mentor,
  CareerTeach,
  CareerInfo,
  About,
  Search,
  Login,
  Home
} from '../../pages';
import Header from './header';
import Personal from '../../pages/Personal/personal';

export default function Nav (props) {
  return (
    <Router>
      <Header />
      <Route exact path='/' component={Home} />
      <Route path='/mentor' component={Mentor} />
      <Route path='/user/edit' component={Personal} />
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
