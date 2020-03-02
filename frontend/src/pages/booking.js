import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Navbar from '../components/Navbar';
import BookingInfo from '../components/BookingInfo';

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
    alignItems: 'center',
    width: '60%',
    height: '400px'
  }
});

export default function Booking() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.rootContainer}>
        <Paper className={classes.container}>
          <BookingInfo />
        </Paper>
      </div>
    </div>
  );
}
