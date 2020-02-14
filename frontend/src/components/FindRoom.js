import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Numberselect from './Numberselect';
import Datepicker from './Datepicker';
import BookButton from './BookButton';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: '10em',
    padding: '70px',
    width: '30%',
    border: 'dotted 2px pink',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '& div': {
      flex: '1 0 50%'
    },
    '& btn': {
      flex: '0 1 100%'
    }
  }
});

export default function FindRoom() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Datepicker className={classes.date} />
      <Numberselect className={classes.div} />
      <BookButton className={classes.btn} />
    </div>
  );
}
