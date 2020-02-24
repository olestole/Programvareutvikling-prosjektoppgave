import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Numberselect from './Numberselect';
import Datepicker from './Datepicker';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    flexWrap: 'wrap'
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  dateLine: {
    width: '50%',
    height: '4em'
  },
  btnContainer: {
    display: 'flex',
    width: '100%'
  },
  btn: {
    width: '100%',
    height: '4em'
  }
});

export default function FindRoom() {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.container}>
      <div className={classes.dateContainer}>
        <Datepicker className={classes.dateLine} />
        <Datepicker className={classes.dateLine} />
        <Numberselect className={classes.dateLine} />
      </div>
      <div className={classes.btnContainer}>
        <Link href="/rooms">
          <Button variant="outlined" color="secondary" className={classes.btn}>
            Finn ditt rom!
          </Button>
        </Link>
      </div>
    </Paper>
  );
}
