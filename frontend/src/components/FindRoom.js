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
    from: Date.now(),
    to: Date.now(),
    quantity: 0
  });

  // Can probably join these two functions into one

  const handleFromDate = date => {
    setState({
      ...state,
      from: date.getTime()
    });
  };

  const handleToDate = date => {
    setState({
      ...state,
      to: date.getTime()
    });
  };

  const handleQuantity = number => {
    console.log(number);
    setState({
      ...state,
      quantity: number
    });
  };

  const handleSubmit = () => {
    console.log(state);
    if (state.to <= state.from) {
      alert("Can't book back in time 🤢");
    } else {
      context.setUser({
        ...context.user,
        booking: {
          ...state
        }
      });

      router.push({
        pathname: '/rooms',
        query: {
          //Have to split this into day, month, year if wanting to use query params
          from_date: state.from,
          to_date: state.to,
          people: state.quantity
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
          value={state.quantity}
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
