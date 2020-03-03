import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  root: props => ({
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    width: `${props.width || '100%'}`,
    backgroundImage: `url(${props.backgroundImage || '/NewYork.jpg'})`,
    position: `${props.position || null}`,
    overflowY: `${props.overflowY || null}`
  }),
  rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh'
  }
});

const Layout = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.rootContainer}>{props.children}</div>
    </div>
  );
};

export default Layout;
