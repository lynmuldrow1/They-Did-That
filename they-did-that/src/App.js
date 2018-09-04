import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { ImplicitCallback } from '@okta/okta-react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import AppHeader from './components/Appheader.js';
import Home from './pages/Home.js';

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Route exact path="/" component={Home} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </main>
  </Fragment>
);

export default withStyles()(App);
