import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const Index = () => {
  const classes = useStyles();

  return (
    <Layout backgroundImage={'NewYork2.jpg'}>
      <Paper elevation={3} className={classes.container}>
        <LoginForm />
      </Paper>
    </Layout>
  );
};

export default Index;
