import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './header';
import {
  Mentor,
  CareerTeach,
  CareerInfo,
  About,
  Search,
  Login,
  Home,
} from '../../pages';

export default function Nav(props) {
  return (
    <Router>
      <Header />
      <Route exact path='/' component={Home}></Route>
      <Route path='/mentor' component={Mentor}></Route>
      <Route path='/careerteach' component={CareerTeach}></Route>
      <Route path='/careerinfo' component={CareerInfo}></Route>
      <Route path='/about' component={About}></Route>
      <Route path='/search' component={Search}></Route>
      <Route path='/login' component={Login}></Route>
    </Router>
  );
}
