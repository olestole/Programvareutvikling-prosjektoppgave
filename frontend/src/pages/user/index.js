import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BookingDetail from '../../components/BookingDetail';

import Layout from '../../components/Layout';
import RequireLogin from '../../utils/requireLogin';
import LoadingSpinner from '../../components/LoadingSpinner';

import withLogin from '../../utils/withLogin';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    width: '90%',
    paddingBottom: '30px'
  }
});

const Index = props => {
  const classes = useStyles();

  return (
    <Layout backgroundImage={'NewYork2.jpg'} overflowY="scroll" {...props}>
      <RequireLogin>
        <Paper elevation={3} className={classes.container}>
          <Suspense fallback={<LoadingSpinner />}>
            <BookingDetail />
          </Suspense>
        </Paper>
      </RequireLogin>
    </Layout>
  );
};

export default withLogin(Index);
