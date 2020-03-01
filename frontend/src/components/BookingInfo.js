import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Ditt rom er booket!</h1>
      <h3>
        {context.user.bookedRoom.from_date} to {context.user.bookedRoom.to_date}
      </h3>
      <h3>Booking referanse: {context.user.bookedRoom.booking_reference}</h3>
      {/* <h3>Pris: {context.user.bookedRoom.room.price}</h3> */}
    </div>
  );
}
