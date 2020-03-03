import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FindRoom from '../components/FindRoom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Index() {
  const classes = useStyles({ backgroundImage: '/NewYork.jpg' });
  return (
    <div className={classes.container}>
      <FindRoom />
    </div>
  );
}
