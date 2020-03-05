import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { UserContext } from './UserProvider';

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
  const context = useContext(UserContext);
  const router = useRouter();
  const classes = useStyles();
  const [state, setState] = useState({
    from_date: null,
    to_date: null,
    people: 0
  });

  const formatDate = date => {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };

  // Can probably join these two functions into one

  const handleFromDate = date => {
    setState({
      ...state,
      from_date: date
    });
  };

  const handleToDate = date => {
    setState({
      ...state,
      to_date: date
    });
  };

  const handleQuantity = number => {
    setState({
      ...state,
      people: number
    });
  };

  const handleSubmit = () => {
    if (state.to_date === null || state.from_date === null) {
      alert('You have to choose a date');
    } else if (state.to_date <= state.from_date) {
      alert("Can't book back in time 🤢");
    } else {
      context.setUser({
        ...context.user,
        booking: {
          to_date: formatDate(state.to_date),
          from_date: formatDate(state.from_date),
          people: state.poeple
        }
      });

      router.push({
        pathname: '/rooms',
        query: {
          //Have to split this into day, month, year if wanting to use query params
          from_date: formatDate(state.from_date),
          to_date: formatDate(state.to_date),
          people: state.people
        }
      });
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
        <Numberselect
          className={classes.dateLine}
          setNumber={handleQuantity}
          value={state.people}
        />
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
