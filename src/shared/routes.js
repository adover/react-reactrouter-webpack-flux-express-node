import React from "react";

import { IndexRoute, Route, RouteHandler } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './app';
import HomePage from './components/homePage';
import ContactHandler from './components/contactHandler';
import NotFoundHandler from './components/notFoundHandler';

/**
 * Put your routes in here, remember to import the relevant component above!
 */
export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path="/contact" component={ContactHandler} />
    <Route path="*" component={NotFoundHandler}/>
  </Route>
);
