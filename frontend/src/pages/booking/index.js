import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Layout from '../../components/shared/Layout';
import BookingInfo from '../../components/booking/BookingInfo';

const useStyles = makeStyles({
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
    <Layout>
      <Paper className={classes.container}>
        <BookingInfo />
      </Paper>
    </Layout>
  );
}
