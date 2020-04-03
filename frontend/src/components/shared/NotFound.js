import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '50px',
    textAlign: 'center',
    minHeight: '300px',
    lineHeight: '100px'
  },
  code: {
    fontFamily: 'Roboto thin',
    fontSize: '120px'
  },
  text: {
    fontFamily: 'Roboto thin'
  }
});

const NotFound = () => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h1" component="big" className={classes.code}>
        404
      </Typography>
      <Typography variant="h3" component="h5" className={classes.text}>
        Vi fant ikke det du lette etter...
      </Typography>
    </Paper>
  );
};

export default NotFound;
