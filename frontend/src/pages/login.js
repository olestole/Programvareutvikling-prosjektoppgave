import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

const Index = ({ query }) => {
  const classes = useStyles();

  return (
    <Layout backgroundImage={'NewYork2.jpg'}>
      <Paper elevation={3} className={classes.container}>
        <LoginForm inBooking={query.inBooking} />
        {/* <h1>{router.pathname}</h1> */}
      </Paper>
    </Layout>
  );
};

Index.getInitialProps = ({ query }) => {
  console.log(query);
  return { query };
};

export default Index;
