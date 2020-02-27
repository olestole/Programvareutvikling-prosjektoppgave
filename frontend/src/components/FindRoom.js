import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const classes = useStyles();
  const [selectedDates, setDates] = useState({
    from: null,
    to: null
  });

  const handleFromDate = date => {
    console.log('FROM:');
    console.log('Day: ' + date.getDate());
    console.log('Month: ' + date.getMonth());
    console.log('Year: ' + date.getYear());

    setDates({
      ...selectedDates,
      from: date
    });
  };

  const handleToDate = date => {
    console.log('TO:');
    console.log('Day: ' + date.getDate());
    console.log('Month: ' + date.getMonth());
    console.log('Year: ' + date.getYear());

    setDates({
      ...selectedDates,
      to: date
    });
  };

  const handleSubmit = () => {
    if (selectedDates.to < selectedDates.from) {
      console.log("Can't go back in time ☹");
    } else {
      router.push('/rooms');
    }
  };

  return (
    <Paper elevation={2} className={classes.container}>
      <div className={classes.dateContainer}>
        <Datepicker
          dateChange={handleFromDate}
          id="from"
          className={classes.dateLine}
        />
        <Datepicker
          dateChange={handleToDate}
          id="to"
          className={classes.dateLine}
        />
        <Numberselect className={classes.dateLine} />
      </div>
      <div className={classes.btnContainer}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}
          onClick={handleSubmit}
        >
          Finn ditt rom!
        </Button>
      </div>
    </Paper>
  );
}
