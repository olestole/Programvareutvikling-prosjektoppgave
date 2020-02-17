import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
import FindRoom from '../components/FindRoom';
// import NewYork from '../../public/NewYork.jpg';

const useStyles = makeStyles({
  container: {
    width: 'auto',
    height: '98vh',
    backgroundImage: `url(${'/NewYork.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  }
});

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Navbar />
      <FindRoom />
    </div>
  );
}
