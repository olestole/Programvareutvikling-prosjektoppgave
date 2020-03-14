import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BookingDetail from '../../components/BookingDetail';

import Layout from '../../components/Layout';
import RequireLogin from '../../utils/requireLogin';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    width: '90%',
    height: '90%'
  }
});

const Index = () => {
  const classes = useStyles();

  return (
    <Layout backgroundImage={'NewYork2.jpg'}>
      <RequireLogin>
        <Paper elevation={3} className={classes.container}>
          <BookingDetail />
        </Paper>
      </RequireLogin>
    </Layout>
  );
};

export default Index;
