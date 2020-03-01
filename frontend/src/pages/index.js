import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
import FindRoom from '../components/FindRoom';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    height: '100vh',
    backgroundImage: `url(${'/NewYork.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  },
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

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.rootContainer}>
        <div className={classes.container}>
          <FindRoom />
        </div>
      </div>
    </div>
  );
}
