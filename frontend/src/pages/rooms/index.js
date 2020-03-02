import React from 'react';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';

import Roomlist from '../../components/Roomlist';
import Navbar from '../../components/Navbar';
import config from '../../../config/env';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    backgroundImage: `url(${'/NewYork.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    position: 'fixed',
    overflowY: 'scroll',
    width: '100%'
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
  },
  spacing: {
    height: '40px'
  }
});

export default function Rooms(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.spacing} />
      <Roomlist rooms={props.rooms} />
    </div>
  );
}

Rooms.getInitialProps = async () => {
  const res = await fetch(`${config.serverUrl}/rooms/`);
  const json = await res.json();
  return { rooms: json };
};
