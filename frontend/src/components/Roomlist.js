import React from 'react';
import Room from '../components/Room';
import { makeStyles } from '@material-ui/core/styles';

// import Layout from "./Layout";
// Styles for the Roomlist container
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '70%',
    marginTop: '18em'
  }
});

const Roomlist = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.rooms.map(room => (
        <Room key={room.id} room={room} />
      ))}
    </div>
  );
};

export default Roomlist;
