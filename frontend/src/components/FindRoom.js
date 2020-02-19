import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Numberselect from './Numberselect';
import Datepicker from './Datepicker';
import BookButton from './BookButton';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: '10em',
    padding: '50px',
    width: '30%',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '& div': {
      flex: '2 0 30%',
      margin: '1px'
    },
    '& kuk': {
      flexGrow: '1 0 100%',
      padding: '200px'
    }
  }
});

export default function FindRoom() {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.container}>
      <Datepicker className={classes.div} />
      <Datepicker className={classes.div} />
      <Numberselect className={classes.div} />
      <BookButton className={classes.kuk} />
    </Paper>
  );
}
