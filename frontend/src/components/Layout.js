import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  root: props => ({
    width: 'auto',
    height: '100vh',
    backgroundImage: `url(${props.backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  }),
  rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Layout = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.rootContainer}>{props.children}</div>
    </div>
  );
};

export default Layout;
