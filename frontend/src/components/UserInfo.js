import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Avatar from './Avatar';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: '40px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const UserInfo = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <div className={classes.row}>
        <h3>OLESTOLE@OUTLOOK.SE</h3>
        <Avatar variant="square" />
      </div>
    </Paper>
  );
};

export default UserInfo;
