import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './UserProvider';

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    flexWrap: 'wrap',
    fontFamily: 'Roboto'
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
  ref: {
    fontWeight: 100
  },
  title: {
    borderBottom: '1px solid black'
  }
});

//const Customer = ({ customer }) => {
//return (
//<div>
//<h3>Bruker data:</h3>
//<>
//{Object.entries(customer).map(([key, val]) =>
//typeof val == 'string' ? (
//<div key={key}>
//<h4>
//{key}: {val}
//</h4>
//</div>
//) : (
//<div />
//)
//)}
//</>
//</div>
//);
//};

export default function FindRoom() {
  const context = useContext(UserContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Ditt rom er booket!</h1>
      <h3>Innsjekk: {context.user.bookedRoom.from_date}</h3>
      <h3>Utsjekk: {context.user.bookedRoom.to_date}</h3>
      <br />
      {/*<Customer customer={context.user.customer} />*/}
      <br />
      <h3 className={classes.ref}>
        Booking referanse: {context.user.bookedRoom.booking_reference}
      </h3>
      {/* <h3>Pris: {context.user.bookedRoom.room.price}</h3> */}
    </div>
  );
}
