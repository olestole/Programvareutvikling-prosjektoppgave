import React from 'react';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';

import Roomlist from '../../components/Roomlist';
import Navbar from '../../components/Navbar';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    height: '100vh',
    backgroundImage: `url(${'/NewYork.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  },
  rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Rooms(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Roomlist rooms={props.rooms} />
    </div>
  );
}

Rooms.getInitialProps = async () => {
  // const res = await fetch(`${config.serverUrl}/rooms/`);
  const res = await fetch(
    'https://secret-harbor-95265.herokuapp.com/api/rooms/'
  );
  const json = await res.json();
  return { rooms: json };
};
