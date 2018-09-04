import React, { Fragment } from 'react';
import {
  withStyles,
} from '@material-ui/core';

import AppHeader  from './components/Appheader.js';
import Home from './pages/Home.js';

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <AppHeader />
    <main className={classes.main}>
      <Home />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
