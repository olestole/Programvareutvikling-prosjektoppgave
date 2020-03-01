import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    height: '100vh',
    backgroundImage: `url(${'/NewYork2.jpg'})`,
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
    flexDirection: 'column'
  }
});

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.rootContainer}>
        <Paper elevation={3} className={classes.container}>
          <LoginForm />
        </Paper>
      </div>
    </div>
  );
};

export default Index;
